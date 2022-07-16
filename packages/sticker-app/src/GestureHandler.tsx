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
  matrix: SkiaMutableValue<SkMatrix>
  dimensions: SkRect
  debug?: boolean
}

export const GestureHandler: FC<Props> = ({ matrix: skMatrix, dimensions, debug }) => {
  const { x, y, width, height } = dimensions
  const origin = useSharedValue(vec3(0, 0, 0))
  const matrix = useSharedValue(identity4)
  const offset = useSharedValue(identity4)

  useSharedValueEffect(() => {
    skMatrix.current = Skia.Matrix(toMatrix3(matrix.value))
  }, matrix)

  const pan = Gesture.Pan().onChange(({ changeY, changeX }) => {
    matrix.value = multiply4(Matrix4.translate(changeX, changeY, 0), matrix.value)
  })

  const rotate = Gesture.Rotation()
    .onBegin(({ anchorX, anchorY }) => {
      origin.value = vec3(anchorX, anchorY, 0)
      offset.value = matrix.value
    })
    .onChange(({ rotation }) => {
      matrix.value = concat(offset.value, origin.value, [{ rotateZ: rotation }])
    })

  const scale = Gesture.Pinch()
    .onBegin(({ focalX, focalY }) => {
      origin.value = vec3(focalX, focalY, 0)
      offset.value = matrix.value
    })
    .onChange(({ scale }) => {
      matrix.value = concat(offset.value, origin.value, [{ scale }])
    })

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: x,
    top: y,
    width,
    height,
    backgroundColor: debug ? "rgba(100, 200, 300, 0.4)" : "transparent",
    transform: [
      { translateX: -width / 2 },
      { translateY: -height / 2 },
      { matrix: matrix.value as any },
      { translateX: width / 2 },
      { translateY: height / 2 }
    ]
  }))

  return (
    <GestureDetector gesture={Gesture.Race(pan, rotate, scale)}>
      <Animated.View style={style} />
    </GestureDetector>
  )
}
