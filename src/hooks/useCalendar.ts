import { calendarEvent } from '@/lib/types'
import { fetchEvents } from '@/services/api/clients'
import { useEffect, useState } from 'react'

type Props = {}

const useCalendar = (props?: Props) => {
  const [events, setEvents] = useState<calendarEvent[]>([]) // * create type props for fetched data
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents(setEvents, setIsLoading)
  }, [])

  return { events, isLoading, refetch: () => fetchEvents(setEvents, setIsLoading) } // fetchEvents()
}

export default useCalendar