import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"

import { Stickers } from "./index"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const App: FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <GestureHandlerRootView>
        <Stickers />
      </GestureHandlerRootView>
    </>
  )
}

export default App
