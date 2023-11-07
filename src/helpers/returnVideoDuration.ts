const returnVideoDuration = (file: File, callback: (duration: number) => void) => {
  const video = document.createElement("video")
  const objectUrl = URL.createObjectURL(file)

  video.onloadedmetadata = () => {
    const durationInSeconds = video.duration
    URL.revokeObjectURL(objectUrl)
    callback(durationInSeconds)
  }

  video.src = objectUrl
}

export default returnVideoDuration