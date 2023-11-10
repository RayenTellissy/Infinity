const formatDuration = (time: number) => {
  const intFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
  })

  const seconds = intFormatter.format(Math.floor(time % 60))
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  if(hours === 0) {
    return `${minutes}:${seconds}`
  }
  else {
    return `${hours}:${intFormatter.format(minutes)}:${seconds}`
  }
}

export default formatDuration