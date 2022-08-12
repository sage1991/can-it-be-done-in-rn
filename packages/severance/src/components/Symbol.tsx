import { FC } from "react"
import { useWindowDimensions } from "react-native"
import { SkFont, SkiaClockValue, useComputedValue, Rect } from "@shopify/react-native-skia"
import { createNoise3D } from "simplex-noise"
import alea from "alea"

import { createVector } from "../utils"

export const rows = 15
export const columns = 10

const digits = createVector(10).map(toString)
const frequency = 0.0004
const r = 125
const a = 10

const noise = createNoise3D(alea("color"))
const colors = ["#61dafb", "#fb61da", "#dafb61", "#61fbcf"]

interface Props {
  i: number
  j: number
  font: SkFont
  clock: SkiaClockValue
}

export const Symbol: FC<Props> = ({ i, j, font, clock }) => {
  const { width, height } = useWindowDimensions()
  const size = { width: width / columns, height: height / rows }
  const y = i * size.height
  const x = j * size.width
  const color = useComputedValue(() => {
    const index = (1 + noise(x / width, y / height, clock.current * frequency)) * 0.5
    return colors[Math.round(index * (colors.length - 1))]
  }, [clock])

  return <Rect x={x} y={y} width={size.width} height={size.height} color={color} />
}
