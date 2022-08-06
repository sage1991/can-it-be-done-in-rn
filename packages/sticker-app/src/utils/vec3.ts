import { Vec3 } from "react-native-redash"

export const vec3 = (x: number, y: number, z: number): Vec3 => {
  "worklet"
  return [x, y, z]
}
