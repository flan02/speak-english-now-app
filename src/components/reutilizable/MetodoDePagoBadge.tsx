
type BadgeProps = {
  title: string[]
  color?: string
}


export function MetodoDePagoBadge({ title, color }: BadgeProps) {


  return (
    <div className='space-y-4 min-w-[350px]'>
      <p className='text-[10px] lg:text-base font-bold lg:font-extrabold'>MÉTODOS DE PAGO ACEPTADOS</p>
      <div className="flex items-end min-w-[350px] flex-wrap lg:justify-center">
        {
          title.map((t, i) => (
            <span key={i} className={`${color} mx-1 px-2 lg:px-4 py-1.5 mt-2`}>{t}</span>
          ))
        }
      </div>
    </div>
  )
}