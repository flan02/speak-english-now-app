import { URL_ROUTES } from '@/services/api/routes';
import confetti from 'canvas-confetti'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

type Props = {
  status: string
}

const useConfetti = ({ status }: Props) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const launchConfetti = () => {

    const duration = 2 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  useEffect(() => {
    if (status !== 'approved') return
    if (status === 'approved') {
      launchConfetti()
      const countdown = setInterval(() => {
        setSeconds((prev) => prev - 1)
      }, 1000)

      const redirectTimer = setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}${URL_ROUTES.CLASES_VIRTUALES}`)
      }, 5000)

      return () => {
        clearInterval(countdown)
        clearTimeout(redirectTimer)
      }
    };
  }, [status, router])

  return { seconds }
}

export default useConfetti