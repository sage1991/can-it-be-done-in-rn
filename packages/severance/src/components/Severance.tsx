import { FC } from "react"
import { StyleSheet } from "react-native"
import { Canvas, Fill, useClockValue, useFont } from "@shopify/react-native-skia"

import { foreground } from "../styles"
import { createVector } from "../utils"
import { columns, rows, Symbol } from "./Symbol"

const sfMonoMedium = require("../assets/SF-Mono-Medium.otf")

const rowVec = createVector(columns)
const columnVec = createVector(rows)

export const Severance: FC = () => {
  const clock = useClockValue()
  const font = useFont(sfMonoMedium)

  if (!font) {
    return null
  }

  return (
    <Canvas style={styles.canvas}>
      <Fill color={foreground} />
      {columnVec.map((i) =>
        rowVec.map((j) => <Symbol key={`${i}-${j}`} i={i} j={j} font={font} clock={clock} />)
      )}
    </Canvas>
  )
}

export const styles = StyleSheet.create({
  canvas: { flex: 1 }
})
