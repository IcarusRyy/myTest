import React from "react"
import AComp from "./a"
import FlushPassiveEffectsComp from "./flushPassiveEffects"
import FlushPassiveEffectsComp2 from "./flushPassiveEffects/i2"
import TestAnim from "./testSche"
import { unstable_scheduleCallback } from "./miniScheduler"
import "./requestIdleCallback/mini"
function App() {
  // console.log(<AComp />, "AComp")
  // const sleep = (delay) => {
  //   for (let start = Date.now(); Date.now() - start <= delay; ) {}
  // }

  // unstable_scheduleCallback(3, () => {
  //   console.log(1)
  // })

  // unstable_scheduleCallback(
  //   2,
  //   () => {
  //     console.log(2)
  //     sleep(10)
  //   },
  //   {
  //     delay: 12,
  //   }
  // )

  // unstable_scheduleCallback(
  //   2,
  //   () => {
  //     console.log(3)
  //   },
  //   {
  //     delay: 13,
  //   }
  // )

  // unstable_scheduleCallback(3, () => {
  //   console.log(4)
  //   sleep(14)
  // })

  // unstable_scheduleCallback(3, () => {
  //   console.log(5)
  // })

  return (
    <div>
      {/* <h1>123</h1>
      <p>123</p> */}
      {/* <TestAnim /> */}
      {/* <AComp /> */}
      {/* <FlushPassiveEffectsComp /> */}
      {/* <FlushPassiveEffectsComp2 /> */}
    </div>
  )
}

export default App
