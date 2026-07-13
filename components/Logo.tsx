export function Monogram({
  size = 26,
  color = "#1B3B33",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill={color}
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 8 H34 A24 24 0 0 1 34 56 H12 Z M18 14 H34 A18 18 0 0 1 34 50 H18 Z"
      />
      <rect x="18" y="18" width="22" height="6" />
      <rect x="18" y="29" width="16" height="6" />
      <rect x="18" y="40" width="22" height="6" />
    </svg>
  );
}

export function Wordmark({
  reversed = false,
  compact = false,
}: {
  reversed?: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={`whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] ${
        reversed ? "text-bone" : "text-ink"
      }`}
    >
      ELLIS{" "}
      <span
        className={`font-normal ${reversed ? "text-sage" : "text-stone"} ${
          compact ? "max-[430px]:hidden" : ""
        }`}
      >
        &amp; ASSOCIATES
      </span>
    </span>
  );
}
