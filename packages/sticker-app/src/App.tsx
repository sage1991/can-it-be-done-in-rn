import React, { FC } from "react"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { Stickers } from "./Stickers"

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
