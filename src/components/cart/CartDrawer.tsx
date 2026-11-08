'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useSound } from '@/hooks/useSound';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, getSubtotal, getTotalCount } = useCart();
  const { playHover, playChime } = useSound();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const subtotal = getSubtotal();
  const totalCount = getTotalCount();
  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9995] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#080808]/85 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        className="relative w-full max-w-lg bg-[#0B0B0B] border-l border-white/15 h-full flex flex-col z-10 shadow-2xl"
        role="dialog"
        aria-label="Shopping Bag"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white" />
            <span className="font-mono text-xs tracking-widest text-white uppercase font-bold">
              SHOPPING BAG [ {totalCount} {totalCount === 1 ? 'PIECE' : 'PIECES'} ]
            </span>
          </div>
          <button
            onClick={() => {
              playHover();
              closeCart();
            }}
            className="text-[#777777] hover:text-white p-2 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping status bar */}
        <div className="px-6 py-3 bg-[#161616]/70 border-b border-white/10">
          <div className="flex justify-between text-[11px] font-mono tracking-wider mb-2">
            <span className="text-[#777777] uppercase">
              {subtotal >= freeShippingThreshold
                ? 'COMPLIMENTARY WORLDWIDE EXPRESS UNLOCKED'
                : `ADD ${formatPrice(freeShippingThreshold - subtotal)} FOR COMPLIMENTARY EXPRESS`}
            </span>
            <span className="text-white font-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1 bg-[#292929] overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 border border-white/15 flex items-center justify-center mb-6">
                <span className="font-mono text-xl text-[#777777]">[ 00 ]</span>
              </div>
              <p className="font-mono text-sm tracking-widest uppercase text-white mb-2">
                BAG IS CURRENTLY EMPTY
              </p>
              <p className="font-mono text-xs text-[#777777] max-w-xs mb-8">
                SELECT SPECIMENS FROM THE RUNWAY, GARMENT ARCHIVE, OR COLLECTION CHAPTERS.
              </p>
              <button
                onClick={() => {
                  playChime();
                  closeCart();
                }}
                className="px-6 py-3 border border-white/40 text-xs font-mono tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
              >
                EXPLORE NEW ARRIVALS
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-[#161616]/40 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="relative w-20 h-24 bg-[#080808] flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="text-[10px] font-mono text-[#777777] tracking-widest uppercase">
                        {item.product.sku}
                      </div>
                      <button
                        onClick={() => {
                          playHover();
                          removeItem(item.id);
                        }}
                        className="text-[#777777] hover:text-white transition-colors"
                        title="Remove piece"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeCart}
                      className="text-xs font-sans font-bold text-white uppercase hover:underline block mt-0.5 line-clamp-1"
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex gap-3 text-[11px] font-mono text-[#C8C8C8] mt-1">
                      <span>SIZE: {item.size}</span>
                      <span>•</span>
                      <span>{item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex items-center border border-white/15 bg-[#080808]">
                      <button
                        onClick={() => {
                          playHover();
                          updateQuantity(item.id, item.quantity - 1);
                        }}
                        className="p-1.5 text-[#777777] hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playHover();
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                        className="p-1.5 text-[#777777] hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0B0B0B] space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#777777]">
                <span>SUBTOTAL</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>ESTIMATED LOGISTICS</span>
                <span className="text-white">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$25 USD'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>ESTIMATED TOTAL</span>
                <span>
                  {formatPrice(subtotal + (subtotal >= freeShippingThreshold ? 0 : 25))}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playChime();
                setCheckoutModalOpen(true);
              }}
              className="w-full py-4 bg-white text-black font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#C8C8C8] transition-colors flex items-center justify-center gap-2 group"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#777777] pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white/50" />
                <span>ARCHIVE AUTHENTICITY GUARANTEED</span>
              </div>
              <button
                onClick={() => {
                  playHover();
                  clearCart();
                }}
                className="hover:text-white transition-colors underline"
              >
                EMPTY BAG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mock Checkout Confirmation Dialog */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#080808]/95 backdrop-blur-2xl">
          <div className="w-full max-w-md bg-[#0B0B0B] border border-white/20 p-8 text-center relative shadow-2xl">
            <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6 text-white" />
            </div>

            <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase mb-2">
              DEMO COMMERCE // PROTOTYPE SYSTEM
            </div>
            <h3 className="text-xl font-sans font-bold uppercase text-white mb-3">
              SIMULATED CHECKOUT ORDER
            </h3>
            <p className="text-xs font-mono text-[#C8C8C8] mb-6 leading-relaxed">
              This digital flagship is Phase 01 frontend prototype. No financial transaction occurred.
              Your order bag contained {totalCount} piece(s) valued at {formatPrice(subtotal)}. Ready for Shopify Storefront API integration in Phase Two.
            </p>

            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                closeCart();
              }}
              className="w-full py-3 bg-white text-black font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#C8C8C8] transition-colors"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

