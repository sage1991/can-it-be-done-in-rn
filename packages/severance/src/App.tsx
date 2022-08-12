import { FC } from "react"
import { StatusBar } from "expo-status-bar"

import { Severance } from "./components"

export const App: FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Severance />
    </>
  )
}
