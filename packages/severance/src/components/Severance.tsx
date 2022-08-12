import { FC } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"
import {
  Canvas,
  Fill,
  useClockValue,
  useFont,
  useTouchHandler,
  useValue,
  vec
} from "@shopify/react-native-skia"

import { background } from "../styles"
import { createVector } from "../utils"
import { columns, rows, Symbol } from "./Symbol"

const sfMonoMedium = require("../assets/SF-Mono-Medium.otf")

const rowVec = createVector(columns)
const columnVec = createVector(rows)

export const Severance: FC = () => {
  const { height } = useWindowDimensions()
  const clock = useClockValue()
  const font = useFont(sfMonoMedium, height / rows)
  const pointer = useValue(vec(0, 0))

  const onTouch = useTouchHandler({
    onActive: ({ x, y }) => {
      pointer.current = { x, y }
    }
  })

  if (!font) {
    return null
  }

  return (
    <Canvas style={styles.canvas} onTouch={onTouch}>
      <Fill color={background} />
      {columnVec.map((i) =>
        rowVec.map((j) => (
          <Symbol key={`${i}-${j}`} i={i} j={j} font={font} clock={clock} pointer={pointer} />
        ))
      )}
    </Canvas>
  )
}

export const styles = StyleSheet.create({
  canvas: { flex: 1 }
})
