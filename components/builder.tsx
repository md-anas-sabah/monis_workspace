"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  DEFAULT_SELECTION,
  STAY_LENGTHS,
  pickedItems,
  type Category,
  type Option,
  type Selection,
} from "@/lib/catalog";
import { WorkspaceScene } from "@/components/scene";
import { AnimatedPrice } from "@/components/animated-price";
import {
  CheckIcon,
  MoonIcon,
  OptionGlyph,
  ResetIcon,
  SunIcon,
} from "@/components/glyphs";

const CONFETTI_COLORS = ["#eab94a", "#c06a3e", "#3b7a52", "#f6ecd2", "#d28459"];

const CONFETTI = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * Math.PI * 2;
  const radius = 70 + ((i * 37) % 80);
  return {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius * 0.75) - 30,
    rotation: (i * 83) % 360,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: (i % 6) * 35,
  };
});

export default function Builder() {
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [dusk, setDusk] = useState(false);
  const [stayIndex, setStayIndex] = useState(0);
  const [rented, setRented] = useState(false);
  const [burst, setBurst] = useState(false);

  const picked = useMemo(() => pickedItems(selection), [selection]);
  const subtotal = picked.reduce((sum, item) => sum + item.option.price, 0);
  const stay = STAY_LENGTHS[stayIndex];
  const discount = Math.round(subtotal * stay.discount);
  const total = subtotal - discount;

  const handleSelect = (category: Category, optionId: string) => {
    setRented(false);
    setSelection((current) => ({
      ...current,
      [category.id]:
        !category.required && current[category.id] === optionId
          ? null
          : optionId,
    }));
  };

  const handleReset = () => {
    setSelection(DEFAULT_SELECTION);
    setStayIndex(0);
    setRented(false);
  };

  const handleRent = () => {
    if (rented) return;
    setRented(true);
    setBurst(true);
    window.setTimeout(() => setBurst(false), 1300);
  };

  const receipt = (
    <section
      aria-label="Your workspace order"
      className="relative overflow-hidden rounded-[26px] bg-palm-950 p-6 text-cream shadow-[0_30px_60px_-30px_rgba(12,35,26,0.55)] lg:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gold-400/10 blur-2xl"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
              Your setup
            </p>
            <h2 className="mt-1 font-display text-2xl">The island office</h2>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-cream/60 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-cream"
          >
            <ResetIcon className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        <ul className="mt-5 space-y-2.5">
          {picked.map(({ category, option }) => (
            <li key={option.id} className="flex items-baseline text-sm">
              <span className="text-cream/90">{option.name}</span>
              <span
                aria-hidden="true"
                className="mx-2 flex-1 border-b border-dotted border-cream/25"
              />
              <span className="tabular-nums text-cream/80">
                ${option.price}
              </span>
              <span className="sr-only">per month, {category.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <p className="mb-2 text-xs text-cream/60">How long are you staying?</p>
          <div
            role="group"
            aria-label="Rental length"
            className="grid grid-cols-3 gap-1 rounded-2xl bg-white/10 p-1"
          >
            {STAY_LENGTHS.map((length, i) => (
              <button
                key={length.months}
                type="button"
                aria-pressed={i === stayIndex}
                onClick={() => {
                  setStayIndex(i);
                  setRented(false);
                }}
                className={`rounded-xl px-2 py-2 text-center text-sm transition ${
                  i === stayIndex
                    ? "bg-cream font-medium text-palm-950 shadow"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                <span className="block leading-tight">{length.label}</span>
                <span
                  className={`block text-[10px] leading-tight ${
                    i === stayIndex ? "text-clay-600" : "text-gold-300/80"
                  }`}
                >
                  {length.discount > 0
                    ? `save ${Math.round(length.discount * 100)}%`
                    : "flexible"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-cream/70">
            <span>Delivery &amp; install</span>
            <span className="text-gold-300">Free</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-cream/70">
              <span>Long-stay discount</span>
              <span className="tabular-nums text-gold-300">−${discount}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <span className="font-display text-lg">Total</span>
          <span className="text-right">
            <AnimatedPrice
              value={total}
              className="font-display text-4xl leading-none"
            />
            <span className="text-sm text-cream/60">/mo</span>
            <span className="mt-1 block text-[11px] text-cream/50">
              billed monthly · cancel anytime
            </span>
          </span>
        </div>

        <div className="relative mt-5">
          {burst && (
            <div aria-hidden="true" className="absolute inset-0 z-10">
              {CONFETTI.map((piece, i) => (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    backgroundColor: piece.color,
                    animationDelay: `${piece.delay}ms`,
                    ["--cx" as string]: `${piece.x}px`,
                    ["--cy" as string]: `${piece.y}px`,
                    ["--cr" as string]: `${piece.rotation}deg`,
                  }}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleRent}
            className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all duration-300 active:scale-[0.99] ${
              rented
                ? "bg-palm-100 text-palm-900"
                : "bg-gold-400 text-ink shadow-[0_14px_30px_-12px_rgba(223,164,46,0.65)] hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-[0_18px_36px_-12px_rgba(223,164,46,0.75)]"
            }`}
          >
            {rented ? "Setup reserved — see you in Bali ✓" : "Rent this setup"}
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-cream/70 ring-1 ring-white/10">
          <p className="font-medium text-cream">
            {rented ? "You're all set" : "What happens next?"}
          </p>
          <p className="mt-1">
            {rented
              ? "Our Canggu team will call you within the hour to schedule delivery. Every piece arrives assembled — you just sit down and open the laptop."
              : "Our Bali team confirms delivery, then installs everything at your villa or co-living space. Swap any piece while you stay."}
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <div id="builder" className="grid items-start gap-6 lg:grid-cols-2 xl:gap-8">
      {/* announce changes to screen readers */}
      <p aria-live="polite" className="sr-only">
        {picked.length} pieces selected, total ${total} per month
      </p>

      {/* ---------- Left: scene + receipt (desktop) ---------- */}
      <div className="space-y-6 lg:sticky lg:top-5">
        <div className="overflow-hidden rounded-[26px] bg-cream shadow-[0_30px_70px_-35px_rgba(38,33,26,0.4)] ring-1 ring-ink/10">
          <div className="relative">
            <WorkspaceScene selection={selection} dusk={dusk} />
            <button
              type="button"
              role="switch"
              aria-checked={dusk}
              aria-label="Toggle evening light"
              onClick={() => setDusk((d) => !d)}
              className={`absolute right-4 top-4 inline-flex items-center gap-1 rounded-full p-1 backdrop-blur transition-colors duration-500 ${
                dusk
                  ? "bg-[#1c1735]/70 text-cream ring-1 ring-white/20"
                  : "bg-white/70 text-ink ring-1 ring-ink/10"
              }`}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full transition-all duration-500 ${
                  dusk ? "opacity-40" : "bg-gold-300 shadow-sm"
                }`}
              >
                <SunIcon className="h-4 w-4" />
              </span>
              <span
                className={`grid h-7 w-7 place-items-center rounded-full transition-all duration-500 ${
                  dusk ? "bg-[#5a4a8a] text-gold-200 shadow-sm" : "opacity-40"
                }`}
              >
                <MoonIcon className="h-4 w-4" />
              </span>
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-ink/5 px-5 py-3.5">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              <span className="h-2 w-2 rounded-full bg-palm-500 motion-safe:animate-pulse-dot" />
              Live preview
            </span>
            <span className="text-sm text-stone-500">
              {picked.length} pieces ·{" "}
              <span className="font-medium tabular-nums text-ink">
                ${total}/mo
              </span>
            </span>
          </div>
        </div>

        <div className="hidden lg:block">{receipt}</div>
      </div>

      {/* ---------- Right: category pickers ---------- */}
      <div>
        {CATEGORIES.map((category, index) => {
          const selectedOption = category.options.find(
            (o) => o.id === selection[category.id],
          );
          return (
            <section
              key={category.id}
              aria-label={category.label}
              className={index === 0 ? "" : "mt-7 border-t border-sand-200 pt-7"}
            >
              <div className="mb-4 flex items-end justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm italic text-clay-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">
                      {category.label}
                      {!category.required && (
                        <span className="ml-2 align-middle font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                          optional
                        </span>
                      )}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-500">
                      {category.help}
                    </p>
                  </div>
                </div>
                <span
                  className={`hidden whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium sm:inline-block ${
                    selectedOption
                      ? "bg-palm-100 text-palm-800"
                      : "text-stone-400 ring-1 ring-sand-300"
                  }`}
                >
                  {selectedOption ? selectedOption.name : "Skipped"}
                </span>
              </div>

              <div
                className={`grid gap-3 ${
                  category.options.length === 3
                    ? "grid-cols-1 min-[420px]:grid-cols-3"
                    : "grid-cols-1 min-[420px]:grid-cols-2"
                }`}
              >
                {category.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    selected={selection[category.id] === option.id}
                    compact={category.options.length === 3}
                    onSelect={() => handleSelect(category, option.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* receipt inline on mobile */}
        <div className="mt-8 lg:hidden">{receipt}</div>
      </div>

      {/* ---------- Mobile dock ---------- */}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 lg:hidden">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl bg-palm-950/95 px-5 py-3 text-cream shadow-[0_18px_45px_-15px_rgba(12,35,26,0.75)] ring-1 ring-white/10 backdrop-blur">
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.16em] text-cream/60">
              {picked.length} pieces
            </p>
            <p>
              <AnimatedPrice value={total} className="font-display text-xl" />
              <span className="text-xs text-cream/60">/mo</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleRent}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
              rented
                ? "bg-palm-100 text-palm-900"
                : "bg-gold-400 text-ink hover:bg-gold-300"
            }`}
          >
            {rented ? "Reserved ✓" : "Rent setup"}
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionCard({
  option,
  selected,
  compact,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group relative rounded-2xl p-4 text-left transition-all duration-200 active:scale-[0.98] ${
        selected
          ? "bg-palm-800 text-cream shadow-[0_18px_40px_-18px_rgba(20,51,38,0.6)] ring-1 ring-palm-800"
          : "bg-cream text-ink shadow-[0_1px_2px_rgba(38,33,26,0.06)] ring-1 ring-ink/10 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-16px_rgba(38,33,26,0.28)] hover:ring-ink/20"
      }`}
    >
      {selected && (
        <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gold-400 text-ink shadow motion-safe:animate-pop">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
      )}
      <span className="flex items-start justify-between gap-2">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
            selected
              ? "bg-cream/15 text-cream"
              : "bg-sand-100 text-stone-700 group-hover:bg-sand-200"
          }`}
        >
          <OptionGlyph optionId={option.id} className="h-6 w-6" />
        </span>
        <span
          className={`text-sm tabular-nums ${
            selected ? "text-cream/80" : "text-stone-500"
          }`}
        >
          ${option.price}
          <span className={selected ? "text-cream/50" : "text-stone-400"}>
            /mo
          </span>
        </span>
      </span>
      <span className={`block ${compact ? "mt-2.5" : "mt-3"}`}>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium">{option.name}</span>
          {option.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                selected
                  ? "bg-gold-400/20 text-gold-300"
                  : "bg-clay-100 text-clay-700"
              }`}
            >
              {option.badge}
            </span>
          )}
        </span>
        <span
          className={`mt-1 block text-sm leading-5 ${
            selected ? "text-cream/70" : "text-stone-500"
          }`}
        >
          {option.description}
        </span>
      </span>
    </button>
  );
}
