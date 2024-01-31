import React, { useEffect, useState } from "react"

const FlushPassiveEffectsComp2 = () => {
  const [count, setCount] = useState(0)

  // flushPassiveEffects方法
  // 1、调用该useEffect在上一次render时的销毁函数 destroy
  // 2、调用该useEffect在本次render时的回调函数
  // 也就是在一下次更新之前 会先执行destroy方法 这里也就是点击按钮的时候 会去打印上一次的count，然后再去执行create方法 也就是再打印最新的count

  useEffect(() => {
    console.log("FlushPassiveEffectsComp2 create:", count)
    return () => {
      console.log("FlushPassiveEffectsComp2 destroy:", count)
    }
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default FlushPassiveEffectsComp2
