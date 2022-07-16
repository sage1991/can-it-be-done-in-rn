import { Matrix4, multiply4, processTransform3d, Transforms3d, Vec3 } from "react-native-redash"

import { transformOrigin3d } from "./transformOrigin3d"

export const concat = (matrix: Matrix4, origin: Vec3, transform: Transforms3d) => {
  "worklet"
  return multiply4(matrix, processTransform3d(transformOrigin3d(origin, transform)))
}
