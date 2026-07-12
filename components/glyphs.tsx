import type { ComponentProps } from "react";

type SvgProps = ComponentProps<"svg">;

function Svg({ children, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Small stroke icon for a catalog option, keyed by option id. */
export function OptionGlyph({
  optionId,
  className,
}: {
  optionId: string;
  className?: string;
}) {
  switch (optionId) {
    case "bamboo":
      return (
        <Svg className={className}>
          <path d="M3 8.5h18" />
          <path d="M5.5 8.5 4 19M18.5 8.5 20 19" />
          <path d="M5 13.7h1.6M18 13.7h-1.6" />
        </Svg>
      );
    case "adjustable":
      return (
        <Svg className={className}>
          <path d="M3 10h18" />
          <path d="M6.5 10v8M17.5 10v8M4.5 18h4M15.5 18h4" />
          <path d="M12 7V3M10 4.8 12 2.8l2 2" />
        </Svg>
      );
    case "lounge":
      return (
        <Svg className={className}>
          <path d="M5.5 12V8a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v4" />
          <path d="M4 12a2 2 0 0 1 2 2v1.5h12V14a2 2 0 1 1 4 0c0 2-1.5 3.5-3.5 3.5h-13C3.5 17.5 2 16 2 14a2 2 0 0 1 2-2Z" />
          <path d="M6.5 17.5 6 20M17.5 17.5l.5 2.5" />
        </Svg>
      );
    case "ergonomic":
      return (
        <Svg className={className}>
          <path d="M8.5 3.5h5a1.6 1.6 0 0 1 1.6 1.8l-.6 6.2a1.6 1.6 0 0 1-1.6 1.5H9.1a1.6 1.6 0 0 1-1.6-1.5l-.6-6.2A1.6 1.6 0 0 1 8.5 3.5Z" />
          <path d="M7.8 13v2.2h6.4V13" />
          <path d="M11 15.2v3M8 21l3-2.8h0l3 2.8" />
        </Svg>
      );
    case "single":
      return (
        <Svg className={className}>
          <rect x="4" y="4.5" width="16" height="11" rx="1.8" />
          <path d="M12 15.5V19M8.5 19h7" />
        </Svg>
      );
    case "dual":
      return (
        <Svg className={className}>
          <rect x="2.5" y="5.5" width="9" height="9" rx="1.4" />
          <rect x="12.5" y="5.5" width="9" height="9" rx="1.4" />
          <path d="M7 14.5V18M17 14.5V18M5 18h4M15 18h4" />
        </Svg>
      );
    case "triple":
      return (
        <Svg className={className}>
          <rect x="1.5" y="7" width="6.2" height="7.5" rx="1.1" />
          <rect x="8.9" y="5.5" width="6.2" height="9" rx="1.1" />
          <rect x="16.3" y="7" width="6.2" height="7.5" rx="1.1" />
          <path d="M12 14.5V18M9.5 18h5" />
        </Svg>
      );
    case "desk-lamp":
      return (
        <Svg className={className}>
          <path d="M5 20h6M8 20v-3" />
          <path d="M8 17 6 8.5 13.5 5l3 4.5" />
          <path d="M13 4.2 18 7l-1.8 3.2-5-2.8Z" />
          <path d="M18.5 12.5l1.2 1.2M20 9.5h1.7" />
        </Svg>
      );
    case "floor-lamp":
      return (
        <Svg className={className}>
          <path d="M8.5 3.5h7l1.5 5h-10Z" />
          <path d="M12 8.5V20M8 20h8" />
          <path d="M12 11l2 2" opacity={0.5} />
        </Svg>
      );
    case "tropical":
      return (
        <Svg className={className}>
          <path d="M12 14C12 8 9 5 4.5 4.5c0 5 2.5 8.5 7.5 9.5Z" />
          <path d="M12 14c0-4.5 2.5-7 7.5-7.5 0 4.5-2.5 7-7.5 7.5Z" />
          <path d="M12 14v3" />
          <path d="M7.5 17h9l-1 4.5h-7Z" />
        </Svg>
      );
    case "succulent":
      return (
        <Svg className={className}>
          <path d="M12 12c-1.8-1.2-2.6-3-2.4-5.5C11.5 7.3 12.4 9 12 12Z" />
          <path d="M12 12c.4-3 1.5-4.7 3.4-5.5.2 2.5-.6 4.3-3.4 5.5Z" />
          <path d="M12 12c-2.8-.4-4.4-1.4-5.4-3.2 2-.7 4 .2 5.4 3.2Z" />
          <path d="M8 14.5h8l-.8 5H8.8Z" />
        </Svg>
      );
    case "coffee":
      return (
        <Svg className={className}>
          <path d="M5 10h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
          <path d="M16 11.5h1.5a2.5 2.5 0 0 1 0 5H16" />
          <path d="M8.5 3.5c-1 1.2 1 1.8 0 3M12.5 3.5c-1 1.2 1 1.8 0 3" />
        </Svg>
      );
    case "beanbag":
      return (
        <Svg className={className}>
          <path d="M12 5c4.5 0 8 5.5 8 9.5 0 3-2.5 5-8 5s-8-2-8-5C4 10.5 7.5 5 12 5Z" />
          <path d="M8 6.5c1.5 2.5 1.5 8-.5 11" opacity={0.6} />
        </Svg>
      );
    default:
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" />
        </Svg>
      );
  }
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <Svg className={className} strokeWidth={2.4}>
      <path d="M5 12.5 10 17.5 19 7" />
    </Svg>
  );
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </Svg>
  );
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Svg>
  );
}

export function LeafIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M19 4C10 4.5 4.5 9.5 4.5 16c0 1.8.6 3.1 1.2 4C7 14 10.5 9.5 16 7c-4 3.5-7 8-8.2 13 .8.3 1.7.5 2.7.5C17 20.5 19.5 12 19 4Z" />
    </Svg>
  );
}

export function ResetIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 5v5h5" />
      <path d="M4.6 13.5A8 8 0 1 0 6 7.5L4 10" />
    </Svg>
  );
}
