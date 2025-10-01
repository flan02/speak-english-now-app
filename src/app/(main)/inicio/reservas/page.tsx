import H1 from '@/components/html/h1'
import { BookAIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Reservas = (props: Props) => {
  // style="border: 0" width="100%" height="600" frameBorder="0"
  return (
    <>
      <div className='flex space-x-4 items-end'>
        <BookAIcon className='mb-0.5' />
        <H1 title='Reservas' />
      </div>
      <section>
        {/* <!-- Google Calendar Appointment Scheduling begin --> */}
        <iframe
          className='w-full h-[700px] lg:h-[800px] mt-4 border-0'
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ybLtExUnUsoF8DycRpmUmsUcey89fMi8lCMOiiQWsOSaTx5quGEfFokrCpv5dqeUjx926Gj_V?gv=true" ></iframe>
        {/* <!-- end Google Calendar Appointment Scheduling --> */}
      </section>
    </>
  )
}

export default Reservas