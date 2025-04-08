import { Event, Action } from './types'

export const useDataLayer = (
  event: Event,
  action: Action,
  name: string,
): void => {
  if (typeof window !== 'undefined') {
    const dataLayer = window.dataLayer! || []
    dataLayer.push({
      event: event,
      action: action,
      name: name,
    })
  }
}
