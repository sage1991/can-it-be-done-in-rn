import React, { FC } from "react"
import { Group, SkiaValue, SkImage, SkMatrix, Image, rect } from "@shopify/react-native-skia"
import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const PictureDimensions = rect(0, 0, width, height)

interface Props {
  matrix: SkiaValue<SkMatrix>
  image: SkImage
}

export const Picture: FC<Props> = ({ matrix, image }) => (
  <Group matrix={matrix}>
    <Image image={image} fit="cover" x={0} y={0} width={width} height={height} />
  </Group>
)
