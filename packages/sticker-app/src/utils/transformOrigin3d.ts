import { Transforms3d, Vec3 } from "react-native-redash"

export const transformOrigin3d = (origin: Vec3, transform: Transforms3d): Transforms3d => {
  "worklet"
  return [
    { translateX: origin[0] },
    { translateY: origin[1] },
    { translateZ: origin[2] },
    ...transform,
    { translateX: -origin[0] },
    { translateY: -origin[1] },
    { translateZ: -origin[2] }
  ]
}
