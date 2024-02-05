export const parseDimensions = (
  width: number,
  height: number,
  options: { MAX_HEIGHT: number; MAX_WIDTH: number } = {
    MAX_HEIGHT: 800,
    MAX_WIDTH: 400
  }
) => {
  const isPortrait = height > width
  const aspectRatio = height / width
  const { MAX_HEIGHT, MAX_WIDTH } = options

  if (isPortrait) {
    const finalHeight = height >= MAX_HEIGHT ? MAX_HEIGHT : height
    const finalWidth = finalHeight / aspectRatio

    return {
      height: finalHeight,
      width: finalWidth
    }
  } else {
    const finalWidth = width >= MAX_WIDTH ? MAX_WIDTH : width
    const finalHeight = finalWidth * aspectRatio

    return {
      width: finalWidth,
      height: finalHeight
    }
  }
}
