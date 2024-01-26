import React, { useState, useCallback } from "react"
import { testStore } from "./store/test"
import { testComplete } from "./util"
const AComp = () => {
  const [count, setCount] = useState(0)
  const storeTest = testStore()
  const { scenes } = storeTest
  function simulateStreamingRequest(cb) {
    // 模拟请求的数据
    const data = [
      { id: 1, content: "Chunk 1" },
      { id: 2, content: "Chunk 2" },
      { id: 3, content: "Chunk 3" },
    ]
    let index = 0

    // 模拟定时器每隔一段时间发送一个数据块
    const timer = setInterval(() => {
      if (index >= data.length) {
        clearInterval(timer)
        console.log("Streaming request completed")
        return
      }

      const chunk = data[index]
      // 模拟处理接收到的数据块
      cb(chunk)
      // console.log(chunk, "chunk")
      index++
    }, 1000) // 间隔1秒发送一个数据块
  }

  const cbFn = useCallback(
    (data) => {
      console.log(JSON.parse(JSON.stringify(scenes)), "cbFn scenes")
      // console.log(data, "cbFn data")
      // storeTest.testAdd(data)
      testComplete(data, storeTest)
    },
    [storeTest, scenes]
  )

  const testFn = () => {
    simulateStreamingRequest((data) => {
      console.log(testStore.getState(), "testFn cbFn scenes")
      console.log(data, "simulateStreamingRequest data")
      testComplete(data, testStore)
    })
    // console.log(storeTest, "storeTest")
  }
  return (
    <div>
      {/* <button onClick={() => setCount((i) => i + 1)}>点击Count+1</button> */}
      <button onClick={testFn}>测试</button>
      {/* <button onClick={() => setCount(count + 1)}>点击Count+1</button>
      <h3 key={count}>大{count}</h3>
      <h2 key={count}>舌{count}</h2>
      <h1 key={count}>头{count}</h1> */}
      {/* {[1, 1, 2, 2].map((item, index) => {
        return (
          <li key={item}>
            {item}+{index}
          </li>
        )
      })} */}
    </div>
  )
}

export default AComp
