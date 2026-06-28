import { cn } from "@/lib/utils"
import { CSSVariables } from "@/lib/theme"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'rounded' | 'circle'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: string | number
  height?: string | number
  role?: string
  ariaLabel?: string
}

const variants = {
  default: "rounded-md",
  rounded: "rounded-lg",
  circle: "rounded-full"
} as const

const sizes = {
  sm: "h-4 w-16",
  md: "h-6 w-24",
  lg: "h-8 w-32",
  xl: "h-10 w-40"
} as const

export function Skeleton({
  className,
  variant = 'default',
  size = 'md',
  width,
  height,
  role = 'status',
  ariaLabel = 'Loading',
  ...props
}: SkeletonProps) {
  const customSize = width || height ? {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  } : sizes[size]

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={cn(
        "animate-pulse bg-muted",
        variants[variant],
        customSize,
        className
      )}
      style={{
        ...(width && { width }),
        ...(height && { height })
      }}
      {...props}
    />
  )
}
