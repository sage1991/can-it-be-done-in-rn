import { FC } from "react"
import { useWindowDimensions } from "react-native"
import {
  dist,
  Extrapolate,
  Group,
  interpolate,
  SkFont,
  SkiaClockValue,
  SkiaValue,
  Text,
  Transforms2d,
  useComputedValue,
  vec,
  Vector
} from "@shopify/react-native-skia"
import { createNoise2D } from "simplex-noise"
import alea from "alea"

import { createVector } from "../utils"
import { foreground } from "../styles"

export const rows = 15
export const columns = 10

const digits = createVector(10).map((i) => `${i}`)
const frequency = 0.0004
const r = 125
const amplitude = 5

const noise = createNoise2D(alea("color"))
const colors = ["#61dafb", "#fb61da", "#dafb61", "#61fbcf"]

interface Props {
  i: number
  j: number
  font: SkFont
  clock: SkiaClockValue
  pointer: SkiaValue<Vector>
}

export const Symbol: FC<Props> = ({ i, j, font, clock, pointer }) => {
  const { width, height } = useWindowDimensions()
  const size = { width: width / columns, height: height / rows }
  const text = digits[Math.round(Math.random() * (digits.length - 1))]

  const origin = vec(j * size.width + size.width / 2, i * size.height + size.height / 2)
  const [symbolWidth] = font.getGlyphWidths(font.getGlyphIDs(text))

  const x = origin.x - symbolWidth / 2
  const y = origin.y + font.getSize() / 2

  const transform = useComputedValue<Transforms2d>(() => {
    const translateX = amplitude * noise(x, clock.current * frequency)
    const translateY = amplitude * noise(y, clock.current * frequency)
    const scale = interpolate(dist(pointer.current, origin), [0, r], [1.5, 0.5], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP
    })
    return [
      { translateX: origin.x },
      { translateY: origin.y },
      { translateX },
      { translateY },
      { scale },
      { translateX: -origin.x },
      { translateY: -origin.y }
    ]
  }, [clock])

  return (
    <Group transform={transform}>
      <Text text={text} x={x} y={y} font={font} color={foreground} />
    </Group>
  )
}
