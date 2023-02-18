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
  const [date, setDate] = useState(dayjs(Date.now()))
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [title, setTitle] = useState('')

  const handleEndTimeChange = (e: any) => {
    setDate(dayjs(e.target.value))
  }

  const handleStartClick = () => {
    setIsRunning(true)
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    if (!date.isValid() || !isRunning) return

    // Save intervalId to clear the interval when the component unmounts
    const intervalId = setInterval(() => {
      const diff = date.diff(dayjs(Date.now()), 'milliseconds')
      setTimeLeft(diff)
    }, 1000)

    // Clear interval on unmount
    return () => clearInterval(intervalId)
  }, [date, isRunning])

  const formattedTimeLeft = dayjs(timeLeft).format('HH:mm:ss:SSS')

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
            <h3 className="text-xl">{formattedTimeLeft}</h3>
          </div>
        </div>
      </main>
    </>
  )
}
