interface ImagePlaceholderProps {
  width?: string
  height?: string
  label?: string
  variant?: 'helix' | 'microscopy' | 'chart' | 'portrait' | 'figure'
  className?: string
}

const ICONS: Record<string, string> = {
  helix: '🧬',
  microscopy: '🔬',
  chart: '📊',
  portrait: '👤',
  figure: '🖼️',
}

const LABELS: Record<string, string> = {
  helix: 'DNA Structure Image',
  microscopy: 'Microscopy Image',
  chart: 'Figure / Chart',
  portrait: 'Photo',
  figure: 'Figure',
}

export default function ImagePlaceholder({
  width = '100%',
  height = '220px',
  label,
  variant = 'figure',
  className = '',
}: ImagePlaceholderProps) {
  const icon = ICONS[variant]
  const displayLabel = label ?? LABELS[variant]

  return (
    <div
      className={`relative bg-ice-blue border border-dashed border-med-blue rounded overflow-hidden flex items-center justify-center ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={displayLabel}
    >
      {/* Subtle grid pattern */}
      <svg
        className="absolute inset-0 pointer-events-none" 
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${variant}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#AED6F1" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>

      {/* Corner brackets — scientific figure style */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center p-4">
        <span className="text-[28px] opacity-70" aria-hidden="true">{icon}</span>
        <span className="font-heading text-[12px] font-semibold text-deep-blue tracking-[0.04em]">{displayLabel}</span>
        <span className="font-body text-[11px] text-gray italic">Replace with image</span>
      </div>
    </div>
  )
}
