import React, { useEffect, useState } from "react"
import FlushPassiveEffectsComp2 from "./i2"

const FlushPassiveEffectsComp = () => {
  const [count, setCount] = useState(0)

  // flushPassiveEffects方法

  // 会自上而下循环处理 useEffect， 对应commitPassiveUnmountEffects， 执行是自下而上， 也就是对应的commitPassiveMountEffects 所以这里会先打印子组件 方法的执行是由schedule调度
  // 父组件更新 会从父

  // 1、调用该useEffect在上一次render时的销毁函数 destroy
  // 2、调用该useEffect在本次render时的回调函数
  // 也就是在一下次更新之前 会先执行destroy方法 这里也就是点击按钮的时候 会去打印上一次的count，然后再去执行create方法 也就是再打印最新的count

  useEffect(() => {
    console.log("create:", count)
    return () => {
      console.log("destroy:", count)
    }
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <FlushPassiveEffectsComp2 />
    </div>
  )
}

export default FlushPassiveEffectsComp
