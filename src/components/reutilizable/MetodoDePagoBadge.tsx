
type BadgeProps = {
  title: string[]
  color?: string
}


export function MetodoDePagoBadge({ title, color }: BadgeProps) {


  return (
    <div className='space-y-4'>
      <p className='font-extrabold'>MÉTODOS DE PAGO ACEPTADOS</p>
      {
        title.map((t, i) => (
          <span key={i} className={`${color} mx-1 px-2 py-1.5`}>{t}</span>
        ))
      }
    </div>
  )
}