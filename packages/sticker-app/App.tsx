import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"

import { Stickers } from "./src"

const App: FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stickers />
    </>
  )
}

export default App
