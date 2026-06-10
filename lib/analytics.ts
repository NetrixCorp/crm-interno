export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined') {
    const gtag = (window as { gtag?: Function }).gtag
    if (typeof gtag === 'function') {
      try {
        gtag('event', eventName, eventParams)
      } catch (error) {
        console.error('trackEvent error:', error)
      }
    }
  }
}
