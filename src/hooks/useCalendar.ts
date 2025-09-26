import { calendarEvent } from '@/lib/types'
import { KY, Method } from '@/services/api'
import { useEffect, useState } from 'react'

type Props = {}

const useCalendar = (props?: Props) => {
  const [events, setEvents] = useState<calendarEvent[]>([]) // * create type props for fetched data
  const [isLoading, setIsLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const response = await KY(Method.GET, 'http://localhost:3000/api/calendar')
      setEvents(response)
    } catch (error) {
      console.error("Error fetching calendar events from frontend:", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])



  return { events, isLoading, refetch: fetchEvents }
}

export default useCalendar