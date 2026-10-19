'use client' // Error boundaries must be Client Components

import posthog from 'posthog-js'
import { useEffect } from 'react'

export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    if (posthog.__loaded) {
      posthog.captureException(error)
    }
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={() => {
              if (posthog.__loaded) {
                posthog.capture('error_recovery_attempted')
                posthog.logger.info('error recovery requested')
              }
              retry()
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}