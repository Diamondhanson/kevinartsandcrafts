/**
 * The Kivens mark — a K abstracted from the interlaced branch legs of the
 * stool. Three strokes, woven: the arm passes behind the stem, the leg in
 * front of it. The weave is created purely by paint order, so the mark stays a
 * single colour and inherits `currentColor`.
 */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={7.2}
      strokeLinecap="round"
    >
      {/* arm — passes behind the stem */}
      <path d="M78,15 C60,25 40,33 21,43" />
      {/* stem */}
      <path d="M32,14 C31,37 33,63 32,86" />
      {/* leg — passes in front of the stem */}
      <path d="M21,57 C40,67 60,75 78,85" />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-9 w-9",
  showSub = true,
}: {
  className?: string;
  markClassName?: string;
  showSub?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={`${markClassName} shrink-0`} />
      <span className="flex flex-col gap-[3px]">
        <span className="font-display text-[1.05rem] uppercase leading-none tracking-[0.16em]">
          Kivens
        </span>
        {showSub && (
          <span className="text-[0.5rem] font-semibold uppercase leading-none tracking-[0.3em] text-graphite">
            Arts &amp; Crafts
          </span>
        )}
      </span>
    </span>
  );
}
