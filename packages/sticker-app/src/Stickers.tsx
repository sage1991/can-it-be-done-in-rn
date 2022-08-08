import React, { FC } from "react"
import { Dimensions } from "react-native"
import { Canvas, Skia, useFont, useImage, useValue } from "@shopify/react-native-skia"

import { GestureHandler } from "./GestureHandler"
import { Picture, PictureDimensions } from "./Picture"
import { HelloSticker, HelloStickerDimensions } from "./HelloSticker"
import { LocationSticker, LocationStickerDimensions } from "./LocationSticker"

const { width, height } = Dimensions.get("window")

const zurich = require("./assets/zurich.jpg")
const aveny = require("./assets/aveny.ttf")

export const Stickers: FC = () => {
  const image = useImage(zurich)
  const font = useFont(aveny, 56)
  const picture = useValue(Skia.Matrix())
  const hello = useValue(Skia.Matrix())
  const location = useValue(Skia.Matrix())

  if (!image || !font) {
    return null
  }

  return (
    <>
      <Canvas style={{ width, height }}>
        <Picture image={image} matrix={picture} />
        <HelloSticker matrix={hello} />
        <LocationSticker matrix={location} font={font} />
      </Canvas>
      <GestureHandler debug skiaMatrix={picture} dimensions={PictureDimensions} />
      <GestureHandler debug skiaMatrix={hello} dimensions={HelloStickerDimensions} />
      <GestureHandler debug skiaMatrix={location} dimensions={LocationStickerDimensions} />
    </>
  )
}
