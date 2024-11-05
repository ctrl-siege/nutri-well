import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface InputWithOverlappingLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input31({
  label,
  id,
  className,
  ...props
}: InputWithOverlappingLabelProps) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="absolute text-muted-fg start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium group-has-[:disabled]:opacity-50"
      >
        {label}
      </label>
      <Input id={id} className={cn('h-10', className)} {...props} />
    </div>
  )
}
