import * as dayjs from 'dayjs'

// Dayjs Formats https://day.js.org/docs/en/display/format

const wrapper = (fn) => {
  return (...args) => {
    try {
      return fn(...args)
    } catch(err) {
      console.log('DATE ERROR')
      console.log(err)
      return null
    }
  }
}

export const prettyPrintDateTime = wrapper((date) => {
  const fmt = 'D MMM h:mm a'
  return dayjs(date).format(fmt)
})