import React, { FC } from "react"
import { Dimensions, View } from "react-native"
import { Canvas, Skia, useFont, useImage, useValue } from "@shopify/react-native-skia"
import { Picture, PictureDimensions } from "./Picture"
import { HelloSticker, HelloStickerDimensions } from "./HelloSticker"
import { GestureHandler } from "./GestureHandler"
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker"

const { width, height } = Dimensions.get("window")

const zurich = require("./assets/zurich.jpg")
const aveny = require("./assets/aveny.ttf")

export const Stickers: FC = () => {
  const pictureMatrix = useValue(Skia.Matrix())
  const helloMatrix = useValue(Skia.Matrix())
  const locationMatrix = useValue(Skia.Matrix())
  const image = useImage(zurich)
  const font = useFont(aveny, 56)

  if (!image || !font) {
    return null
  }

  return (
    <View>
      <Canvas style={{ width, height }}>
        <Picture matrix={pictureMatrix} image={image} />
        <HelloSticker matrix={helloMatrix} />
        <LocationSticker matrix={locationMatrix} font={font} />
      </Canvas>
      <GestureHandler matrix={pictureMatrix} dimensions={PictureDimensions} debug />
      <GestureHandler matrix={helloMatrix} dimensions={HelloStickerDimensions} debug />
      <GestureHandler matrix={locationMatrix} dimensions={LocationStickerDimensions} debug />
    </View>
  )
}
