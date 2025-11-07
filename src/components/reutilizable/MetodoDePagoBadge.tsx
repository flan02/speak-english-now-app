
type BadgeProps = {
  title: string[]
  color?: string
}


export function MetodoDePagoBadge({ title, color }: BadgeProps) {


  return (
    <div className='space-y-4 min-w-[340px]'>
      <p className='text-center xl:text-left 2xl:text-left text-[10px] lg:text-base font-bold lg:font-extrabold'>MÉTODOS DE PAGO ACEPTADOS</p>
      <div className="flex items-end min-w-[340px] -ml-2 lg:ml-0 xl:ml-0 flex-wrap lg:justify-center">
        {
          title.map((t, i) => (
            <span key={i} className={`${color} mx-1 px-2 lg:px-4 py-1.5 mt-2`}>{t}</span>
          ))
        }
      </div>
    </div>
  )
}