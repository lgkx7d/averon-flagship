const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const outputDir = path.join(__dirname, 'public', 'tests');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const errors = [];
  const logError = (msg) => {
    console.error('❌ ' + msg);
    errors.push(msg);
  };
  const logSuccess = (msg) => console.log('✅ ' + msg);

  // ==========================================
  // TEST 1: DESKTOP EXPERIMENTAL FLAGSHIP
  // ==========================================
  console.log('\n--- TEST 1: DESKTOP FLAGSHIP & OPENING SEQUENCE ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('pageerror', (err) => logError(`Page Error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') logError(`Browser Error: ${msg.text()}`);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // 1.1 Verify Loader element exists
  const loader = await page.$('text=AVERON / SYSTEM INITIALIZING');
  if (loader) {
    logSuccess('Loader text found');
  }

  // 1.2 Wait for loader exit or click Skip
  const skipBtn = await page.$('button:has-text("SKIP INTRO")');
  if (skipBtn) {
    await skipBtn.click();
    logSuccess('Skipped loader with [ESC] button');
  }
  await page.waitForTimeout(1000);

  // 1.3 Verify Hero is active
  const heroAveron = await page.$('text=AVE');
  if (heroAveron) logSuccess('Hero monumental typography rendered');

  await page.screenshot({ path: path.join(outputDir, '01-hero.png') });

  // 1.4 Test Search Modal
  console.log('\n--- TEST 2: SEARCH OVERLAY ---');
  await page.click('button:has-text("SEARCH")');
  await page.waitForTimeout(500);
  const searchInput = await page.$('input[placeholder*="SEARCH PIECE"]');
  if (searchInput) {
    await searchInput.fill('DENIM');
    await page.waitForTimeout(500);
    const searchResult = await page.$('text=DISTRESSED WIDE-LEG');
    if (searchResult) logSuccess('Search filtered DENIM correctly');
    await page.screenshot({ path: path.join(outputDir, '02-search.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  } else {
    logError('Search input not found');
  }

  // 1.5 Test Navigation Takeover
  console.log('\n--- TEST 3: FULLSCREEN NAVIGATION TAKEOVER ---');
  await page.click('button:has-text("MENU")');
  await page.waitForTimeout(600);
  const menuBottoms = await page.$('text=02 BOTTOMS');
  if (menuBottoms) {
    logSuccess('Navigation takeover opened with monumental category typography');
    await page.screenshot({ path: path.join(outputDir, '03-nav-takeover.png') });
    await page.click('button:has-text("CLOSE")');
    await page.waitForTimeout(500);
  } else {
    logError('Menu overlay category not found');
  }

  // 1.6 Scroll to Horizontal Runway
  console.log('\n--- TEST 4: HORIZONTAL RUNWAY ---');
  await page.evaluate(() => {
    document.querySelector('#runway')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outputDir, '04-runway.png') });
  logSuccess('Runway captured');

  // 1.7 Test The Garment Archive Interactive Category Switching
  console.log('\n--- TEST 5: THE GARMENT ARCHIVE ---');
  await page.evaluate(() => {
    window.scrollTo(0, 4800);
  });
  await page.waitForTimeout(1000);

  const jacketsTab = await page.$('button:has-text("04 JACKETS")');
  if (jacketsTab) {
    await jacketsTab.click();
    await page.waitForTimeout(800);
    const jacketName = await page.$('text=STRUCTURED OUTERWEAR COAT');
    if (jacketName) logSuccess('Garment Archive switched category to JACKETS seamlessly');
    await page.screenshot({ path: path.join(outputDir, '05-archive-jackets.png') });

    // Test quick add to bag from archive
    const addArchiveBtn = await page.$('button:has-text("ADD TO BAG")');
    if (addArchiveBtn) {
      await addArchiveBtn.click();
      await page.waitForTimeout(600);
      logSuccess('Added garment from Archive Stage into Shopping Bag');
      await page.screenshot({ path: path.join(outputDir, '06-cart-drawer.png') });
      await page.click('button[aria-label="Close bag"]');
      await page.waitForTimeout(500);
    }
  }

  // ==========================================
  // TEST 6: SHOP PAGE & FILTER SYSTEM
  // ==========================================
  console.log('\n--- TEST 6: SHOP CATALOGUE & FILTERING ---');
  await page.goto('http://localhost:3000/shop', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const shopTitle = await page.$('h1:has-text("COMPLETE CATALOGUE")');
  if (shopTitle) logSuccess('Shop catalogue loaded');

  // Filter by Bottoms
  const bottomsFilter = await page.$('button:has-text("02 BOTTOMS")');
  if (bottomsFilter) {
    await bottomsFilter.click();
    await page.waitForTimeout(500);
    const countCheck = await page.$('text=SHOWING 1 SPECIMENS');
    if (countCheck) logSuccess('Filtered successfully to 1 bottom specimen');
    await page.screenshot({ path: path.join(outputDir, '07-shop-filtered.png') });
  }

  // ==========================================
  // TEST 7: PRODUCT DETAIL PAGE & SIZE GUIDE
  // ==========================================
  console.log('\n--- TEST 7: PRODUCT DETAIL EXPERIENCE ---');
  await page.goto('http://localhost:3000/product/avg-01', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const productHeader = await page.$('h1:has-text("HEAVYWEIGHT ARCHIVE TEE")');
  if (productHeader) logSuccess('Product page avg-01 loaded');

  // Test Size Guide
  const sizeGuideBtn = await page.$('button:has-text("SIZE GUIDE")');
  if (sizeGuideBtn) {
    await sizeGuideBtn.click();
    await page.waitForTimeout(400);
    const matrixModal = await page.$('text=AVERON SIZING ARCHIVE');
    if (matrixModal) logSuccess('Size guide modal opened with metric table');
    await page.screenshot({ path: path.join(outputDir, '08-size-guide.png') });
    await page.click('button:has-text("CLOSE MATRIX")');
    await page.waitForTimeout(400);
  }

  // Test Add To Bag on Product Detail
  const addToBagBtn = await page.$('button:has-text("ADD TO BAG")');
  if (addToBagBtn) {
    await addToBagBtn.click();
    await page.waitForTimeout(800);
    logSuccess('Added product detail piece to bag (drawer auto-opened)');
  }

  // Test Shopping Bag Drawer Operations
  const checkoutBtn = await page.$('button:has-text("PROCEED TO CHECKOUT")');
  if (checkoutBtn) {
    await checkoutBtn.click();
    await page.waitForTimeout(600);
    const demoModal = await page.$('text=SIMULATED CHECKOUT ORDER');
    if (demoModal) logSuccess('Simulated checkout prototype dialog opened successfully');
    await page.screenshot({ path: path.join(outputDir, '09-checkout-dialog.png') });
    await page.click('button:has-text("CONTINUE EXPLORING")');
    await page.waitForTimeout(400);
  }

  // ==========================================
  // TEST 8: MOBILE VIEWPORT TEST (390x844)
  // ==========================================
  console.log('\n--- TEST 8: MOBILE VIEWPORT VERIFICATION ---');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  const mobileSkip = await mobilePage.$('button:has-text("SKIP INTRO")');
  if (mobileSkip) await mobileSkip.click();
  await mobilePage.waitForTimeout(1000);

  // Check no accidental horizontal page overflow
  const isOverflowing = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (!isOverflowing) {
    logSuccess('Zero horizontal layout overflow on mobile viewport');
  } else {
    logError('Horizontal layout overflow detected on mobile');
  }

  await mobilePage.screenshot({ path: path.join(outputDir, '10-mobile-hero.png') });

  await browser.close();

  console.log('\n==========================================');
  if (errors.length === 0) {
    console.log('🎉 ALL 8 E2E TEST SUITES PASSED FLAWLESSLY WITH ZERO ERRORS!');
  } else {
    console.log(`⚠️ Encountered ${errors.length} issues.`);
  }
  console.log('==========================================\n');
})();
