import { useRef, useEffect, useState, useCallback } from 'react'

interface UseDojoTimerProps {
  endTime: Date
  onComplete?: () => void
}

interface TimerState {
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  totalSeconds: number
}

export function useDojoTimer({ endTime, onComplete }: UseDojoTimerProps): TimerState {
  const [timerState, setTimerState] = useState<TimerState>(() => calculateTime(endTime))
  const intervalRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const calculateTimeCallback = useCallback(() => {
    const state = calculateTime(endTime)
    setTimerState(state)
    
    if (state.isExpired && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      onCompleteRef.current?.()
    }
  }, [endTime])

  useEffect(() => {
    // Initial calculation
    calculateTimeCallback()

    // Update every second using requestAnimationFrame for smoother updates
    intervalRef.current = window.setInterval(calculateTimeCallback, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [calculateTimeCallback])

  return timerState
}

function calculateTime(endTime: Date): TimerState {
  const now = new Date()
  const diff = endTime.getTime() - now.getTime()

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { hours, minutes, seconds, isExpired: false, totalSeconds }
}
