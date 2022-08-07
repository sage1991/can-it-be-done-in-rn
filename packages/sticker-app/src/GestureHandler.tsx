import React, { FC } from "react"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import {
  Skia,
  SkiaMutableValue,
  SkMatrix,
  SkRect,
  useSharedValueEffect
} from "@shopify/react-native-skia"
import { identity4, Matrix4, multiply4, toMatrix3 } from "react-native-redash"

import { concat, vec3 } from "./utils"

interface Props {
  skiaMatrix: SkiaMutableValue<SkMatrix>
  dimensions: SkRect
  debug?: boolean
}

export const GestureHandler: FC<Props> = ({ skiaMatrix, dimensions, debug, children }) => {
  const { x, y, width, height } = dimensions
  const origin = useSharedValue(vec3(0, 0, 0))
  const offset = useSharedValue(identity4)
  const matrix = useSharedValue(identity4)

  useSharedValueEffect(() => {
    skiaMatrix.current = Skia.Matrix(toMatrix3(matrix.value))
  }, matrix)

  const pan = Gesture.Pan().onChange(({ changeX, changeY }) => {
    matrix.value = multiply4(Matrix4.translate(changeX, changeY, 0), matrix.value)
  })

  const pinch = Gesture.Pinch()
    .onBegin(({ focalX, focalY }) => {
      offset.value = matrix.value
      origin.value = [focalX, focalY, 0]
    })
    .onChange(({ scale }) => {
      matrix.value = concat(offset.value, origin.value, [{ scale }])
    })

  const rotate = Gesture.Rotation()
    .onBegin(({ anchorX, anchorY }) => {
      offset.value = matrix.value
      origin.value = [anchorX, anchorY, 0]
    })
    .onChange(({ rotation }) => {
      matrix.value = concat(offset.value, origin.value, [{ rotateZ: rotation }])
    })

  const style = useAnimatedStyle(
    () => ({
      backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      transform: [
        { translateX: -(width / 2) },
        { translateY: -(height / 2) },
        // @ts-ignore
        { matrix: matrix.value },
        { translateX: width / 2 },
        { translateY: height / 2 }
      ]
    }),
    [debug, x, y, width, height, matrix]
  )

  return (
    <GestureDetector gesture={Gesture.Race(pan, rotate, pinch)}>
      {/* @ts-ignore */}
      <Animated.View style={style} />
    </GestureDetector>
  )
}
