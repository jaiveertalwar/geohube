export const formatMonthDayYearTime = (dateRaw: Date | undefined) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  if (!dateRaw) return ''

  const date = new Date(dateRaw)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours()
  const formattedHours = hours > 12 ? hours - 12 : hours
  const meridiem = hours < 12 ? 'AM' : 'PM'
  const mins = date.getMinutes().toString().padStart(2, '0')

  return `${month} ${day}, ${year} ${formattedHours || 12}:${mins} ${meridiem}`
}
