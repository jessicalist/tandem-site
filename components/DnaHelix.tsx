'use client'

interface DnaHelixProps {
  width?: number
  height?: number
  className?: string
  opacity?: number
  color1?: string
  color2?: string
}

export default function DnaHelix({
  width = 120,
  height = 320,
  className = '',
  opacity = 1,
  color1 = '#AED6F1',
  color2 = '#2E86C1',
}: DnaHelixProps) {
  // Generate helix strand points
  const steps = 20
  const cx = width / 2
  const amplitude = width * 0.35
  const stepH = height / steps

  const strand1Points: string[] = []
  const strand2Points: string[] = []
  const rungs: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []

  for (let i = 0; i <= steps; i++) {
    const y = i * stepH
    const angle = (i / steps) * Math.PI * 4 // 2 full rotations
    const x1 = cx + Math.sin(angle) * amplitude
    const x2 = cx - Math.sin(angle) * amplitude

    strand1Points.push(`${i === 0 ? 'M' : 'L'} ${x1.toFixed(1)} ${y.toFixed(1)}`)
    strand2Points.push(`${i === 0 ? 'M' : 'L'} ${x2.toFixed(1)} ${y.toFixed(1)}`)

    // Add rungs every other step
    if (i % 2 === 0) {
      const crossOpacity = Math.abs(Math.sin(angle)) * 0.7 + 0.2
      rungs.push({ x1, y1: y, x2, y2: y, opacity: crossOpacity })
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Rung connectors */}
      {rungs.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke={color1}
          strokeWidth="1.5"
          strokeOpacity={r.opacity * 0.6}
          strokeLinecap="round"
        />
      ))}

      {/* Strand 2 (back) */}
      <path
        d={strand2Points.join(' ')}
        fill="none"
        stroke={color1}
        strokeWidth="2.5"
        strokeOpacity={0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Strand 1 (front) */}
      <path
        d={strand1Points.join(' ')}
        fill="none"
        stroke={color2}
        strokeWidth="3"
        strokeOpacity={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Node dots on strand 1 */}
      {rungs.map((r, i) => (
        <circle
          key={`dot-${i}`}
          cx={r.x1}
          cy={r.y1}
          r="3.5"
          fill={color2}
          fillOpacity={0.5}
        />
      ))}
    </svg>
  )
}
