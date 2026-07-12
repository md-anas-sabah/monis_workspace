import Builder from "@/components/builder";
import { CheckIcon, LeafIcon, SunIcon } from "@/components/glyphs";

const ASSURANCES = [
  "Delivered & installed in 48h",
  "Swap any piece, anytime",
  "Cancel monthly",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <main className="mx-auto max-w-6xl px-5 pb-32 sm:px-8 lg:pb-16">
        {/* ---------- Header ---------- */}
        <header className="flex items-center justify-between py-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-palm-800 text-cream shadow-sm">
              <LeafIcon className="h-5 w-5" />
            </span>
            <span className="font-display text-xl tracking-tight text-ink">
              monis<span className="italic text-clay-500">.rent</span>
            </span>
          </a>
          <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-sm text-stone-600 ring-1 ring-ink/10">
            <SunIcon className="h-4 w-4 text-gold-500" />
            Canggu · Bali
          </span>
        </header>

        {/* ---------- Hero ---------- */}
        <section className="motion-safe:animate-rise mb-10 mt-6 max-w-2xl lg:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-palm-700">
            The workspace builder
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.1rem)] leading-[1.02] tracking-tight text-ink">
            Build your <em className="italic text-clay-500">island office</em>,
            piece by piece.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
            Pick every piece, watch the room come together, and have it
            installed at your villa within 48 hours. Renting beats owning —
            especially 8,000 miles from home.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
            {ASSURANCES.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-palm-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Builder ---------- */}
        <div
          className="motion-safe:animate-rise"
          style={{ animationDelay: "120ms" }}
        >
          <Builder />
        </div>

        {/* ---------- Footer ---------- */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-sand-200 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} monis.rent — Bali</p>
          <p className="font-display italic text-stone-400">
            workspaces, minus the commitment.
          </p>
        </footer>
      </main>
    </div>
  );
}
