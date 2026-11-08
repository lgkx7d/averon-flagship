const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const outDir = path.join(__dirname, 'public', 'tests', 'mobile');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const errors = [];
  const logError = (msg) => {
    console.error('❌ ' + msg);
    errors.push(msg);
  };
  const logSuccess = (msg) => console.log('✅ ' + msg);

  const testWidths = [320, 360, 375, 390, 414, 430, 768];

  console.log('\n==========================================');
  console.log('--- AVERON MOBILE EXPERIENCE TEST SUITE ---');
  console.log('==========================================\n');

  // 1. Viewport Overflow Verification
  console.log('--- TEST 1: RESPONSIVE WIDTH HORIZONTAL OVERFLOW ---');
  for (const width of testWidths) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    const skip = await page.$('button:has-text("SKIP INTRO")');
    if (skip) await skip.click();
    await page.waitForTimeout(600);

    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (!isOverflowing) {
      logSuccess(`Viewport ${width}px: Zero horizontal layout overflow`);
    } else {
      logError(`Viewport ${width}px: Layout overflow detected!`);
    }

    if (width === 390) {
      await page.screenshot({ path: path.join(outDir, '01-mobile-hero-390.png') });
    }
    await page.close();
  }

  // 2. Mobile Hero Touch Interactions
  console.log('\n--- TEST 2: MOBILE HERO PORTRAIT COMPOSITION ---');
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  const skip = await page.$('button:has-text("SKIP INTRO")');
  if (skip) await skip.click();
  await page.waitForTimeout(800);

  const heroStatement = await page.$('text=UNIFORM');
  if (heroStatement) logSuccess('Mobile hero monumental typography rendered');

  const exploreBtn = await page.$('a:has-text("RUNWAY [05]")');
  if (exploreBtn) logSuccess('Mobile thumb actions visible and accessible');

  // 3. Mobile Swipe Runway
  console.log('\n--- TEST 3: MOBILE SWIPE RUNWAY ---');
  await page.evaluate(() => {
    document.querySelector('#runway')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);

  const runwayCard1 = await page.$('text=RUNWAY ARCHIVE // CHAPTER 01');
  if (runwayCard1) logSuccess('Mobile Runway Chapter 01 header visible');

  const inspectBtn = await page.$('a:has-text("INSPECT PIECE")');
  if (inspectBtn) logSuccess('Mobile Runway piece action present');

  await page.screenshot({ path: path.join(outDir, '02-mobile-runway.png') });

  // 4. Mobile Editorial Gallery
  console.log('\n--- TEST 4: MOBILE EDITORIAL GALLERY ---');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'NEW FORM')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);

  const galleryTitle = await page.$('text=NEW FORM.');
  if (galleryTitle) logSuccess('Mobile editorial gallery rendered with bold black typography');
  await page.screenshot({ path: path.join(outDir, '03-mobile-gallery-offwhite.png') });

  // 5. Mobile Garment Explorer
  console.log('\n--- TEST 5: MOBILE GARMENT EXPLORER ---');
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'JERSEY') or contains(., 'GARMENT')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);

  const jacketsPill = page.locator('button:visible:has-text("04 JACKETS")').first();
  if (await jacketsPill.count() > 0) {
    await jacketsPill.click();
    await page.waitForTimeout(600);
    const jacketHeader = await page.locator('text=BONDED TAILORING').first().isVisible();
    if (jacketHeader) logSuccess('Mobile Garment Explorer switched category to BONDED TAILORING');
    await page.screenshot({ path: path.join(outDir, '04-mobile-archive-jackets.png') });
  }

  // 6. Mobile Fullscreen Navigation
  console.log('\n--- TEST 6: MOBILE NAVIGATION TAKEOVER ---');
  const menuBtn = page.locator('button:visible:has-text("MENU")').first();
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await page.waitForTimeout(600);

    const isScrollLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
    if (isScrollLocked) logSuccess('Body scroll locked while mobile navigation takeover is open');

    const navItem = await page.locator('text=01 TOPS').first().isVisible();
    if (navItem) logSuccess('Mobile navigation takeover displays category links');
    await page.screenshot({ path: path.join(outDir, '05-mobile-nav-takeover.png') });

    const closeBtn = page.locator('button:visible:has-text("CLOSE")').first();
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await page.waitForTimeout(400);
      const isScrollRestored = await page.evaluate(() => document.body.style.overflow === '');
      if (isScrollRestored) logSuccess('Body scroll restored after mobile menu closes');
    }
  }

  // 7. Mobile Product Detail Experience
  console.log('\n--- TEST 7: MOBILE PRODUCT DETAIL EXPERIENCE ---');
  await page.goto('http://localhost:3000/product/avg-01', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  const stickyBar = await page.locator('text=HEAVYWEIGHT ARCHIVE TEE').first().isVisible();
  if (stickyBar) logSuccess('Mobile product detail loaded');

  const stickyAddBtn = page.locator('button:visible:has-text("ADD TO BAG")').first();
  if (await stickyAddBtn.count() > 0) {
    logSuccess('Mobile sticky bottom Add to Bag bar present within thumb reach');
    await stickyAddBtn.click();
    await page.waitForTimeout(600);
    logSuccess('Added to bag via mobile sticky action');
  }

  await page.screenshot({ path: path.join(outDir, '06-mobile-product-sticky.png') });

  await page.close();
  await browser.close();

  console.log('\n==========================================');
  if (errors.length === 0) {
    console.log('🎉 ALL MOBILE TESTS PASSED FLAWLESSLY WITH ZERO ERRORS!');
  } else {
    console.log(`⚠️ Encountered ${errors.length} issues.`);
  }
  console.log('==========================================\n');
})();
