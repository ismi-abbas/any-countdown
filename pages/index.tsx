import Head from 'next/head'
import { Inter } from '@next/font/google'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import { useState, useEffect } from 'react'
dayjs.extend(relativeTime)
dayjs.extend(duration)

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [endTime, setEndTime] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [title, setTitle] = useState('')
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value)
  }

  const handleStartClick = () => {
    setIsRunning(true)
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    if (!isRunning) {
      return // exit early if the countdown hasn't started yet
    }

    const target = dayjs(endTime)
    const interval: any = setInterval(() => {
      const now = dayjs()
      const difference = target.diff(now)

      if (difference < 0) {
        // countdown is complete
        setIsRunning(false)
        setTimeLeft(0)
        return clearInterval(interval)
      }

      setTimeLeft(difference)
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime, isRunning])

  useEffect(() => {
    const duration = dayjs.duration(timeLeft)
    setDays(duration.days())
    setHours(duration.hours())
    setMinutes(duration.minutes())
    setSeconds(duration.seconds())
  }, [timeLeft])

  return (
    <>
      <Head>
        <title>Any Countdown</title>
        <meta name="description" content="Any Coundown Timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className="grid grid-rows-1">
          <div className="text-center text-3xl font-bold px-24 py-20">
            <h1>any-countdown</h1>
          </div>
          <div className="grid grid-rows-1">
            <div className="text-center py-1">
              <label htmlFor="end-time">End Time</label>
              <div>
                <input
                  type="datetime-local"
                  id="end-time"
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-rows-1">
            <div>
              <div className="text-center py-4">
                <label htmlFor="end-time">Title</label>
                <div>
                  <input
                    className="border p-2 rounded-md hover:border-green-500 mt-2"
                    type="text"
                    id="text"
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center py-1">
            <button
              className="mt-2 border p-2 rounded-md hover:border-green-500"
              onClick={handleStartClick}
            >
              Start Countdown
            </button>
            <h1 className="text-2xl font-semibold py-3">Time left</h1>
            {timeLeft === 0 ? (
              'Done'
            ) : (
              <div className="text-5xl">
                <span>{days} Days</span> <span>{hours} Hours</span>{' '}
                <span>{minutes} Minutes</span> <span>{seconds} Seconds</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
