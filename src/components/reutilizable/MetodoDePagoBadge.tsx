import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"

type BadgeProps = {
  title: string[]
  color?: string
  margin?: string
}


export function MetodoDePagoBadge({ title, color, margin }: BadgeProps) {
  return (
    <div
      className={twMerge(clsx("space-y-4 min-w-[340px] -ml-2 px-2 xl:px-0 2xl:px-0", margin))}
    >
      <p className="text-center xl:text-left 2xl:text-left text-[10px] lg:text-base font-bold lg:font-extrabold">
        MÉTODOS DE PAGO ACEPTADOS
      </p>
      <div className="flex items-end min-w-[335px] lg:ml-0 xl:ml-0 flex-wrap lg:justify-center -ml-2">
        {title.map((t, i) => (
          <span
            key={i}
            className={twMerge(clsx("mx-1 px-2 lg:px-4 py-1.5 mt-2", color))}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}