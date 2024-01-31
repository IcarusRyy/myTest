// // 参考 MDN Background Tasks API 这篇文章
// // https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API#example

// const sleep = (delay) => {
//   for (let start = Date.now(); Date.now() - start <= delay; ) {}
// }

// let taskHandle = null
// // let taskList = [
// //   () => {
// //     console.log("task1")
// //   },
// //   () => {
// //     console.log("task2")
// //   },
// //   () => {
// //     console.log("task3")
// //   },
// // ]
// let taskList = [
//   () => {
//     console.log("task1")
//     sleep(50)
//     console.log("task after")
//   },
//   () => {
//     console.log("task2")
//     sleep(50)
//   },
//   () => {
//     console.log("task3")
//     sleep(50)
//   },
// ]

// // deadline.didTimeout 表示任务是否因为超过了指定的超时时间而被强制执行
// function runTaskQueue(deadline) {
//   console.log(
//     `deadline: ${deadline.timeRemaining()}, didTimeout:${deadline.didTimeout}`
//   )
//   while (
//     (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
//     taskList.length
//   ) {
//     let task = taskList.shift()
//     task()
//   }

//   if (taskList.length) {
//     taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 })
//   } else {
//     taskHandle = 0
//   }
// }

// requestIdleCallback(runTaskQueue, { timeout: 1000 })

// 用于模拟代码执行耗费时间
const sleep = (delay) => {
  for (let start = Date.now(); Date.now() - start <= delay; ) {}
}

// performWorkUntilDeadline 的执行时间，也就是一次批量任务执行的开始时间，通过现在的时间 - startTime，来判断是否超过了切片时间
let startTime

let scheduledHostCallback
let isMessageLoopRunning = false
let getCurrentTime = () => performance.now()

const taskQueue = [
  {
    expirationTime: 1000000,
    callback: () => {
      sleep(30)
      console.log("task1")
    },
  },
  {
    expirationTime: 1000000,
    callback: () => {
      sleep(30)
      console.log("task2")
    },
  },
  {
    expirationTime: 1000000,
    callback: () => {
      sleep(30)
      console.log("task3")
    },
  },
]

function requestHostCallback(callback) {
  console.log("123")
  scheduledHostCallback = callback
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true
    schedulePerformWorkUntilDeadline()
  }
}

const channel = new MessageChannel()
const port = channel.port2

function performWorkUntilDeadline() {
  console.log("456")
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime()
    startTime = currentTime
    const hasTimeRemaining = true

    let hasMoreWork = true
    try {
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime)
    } finally {
      if (hasMoreWork) {
        schedulePerformWorkUntilDeadline()
      } else {
        isMessageLoopRunning = false
        scheduledHostCallback = null
      }
    }
  } else {
    isMessageLoopRunning = false
  }
}

channel.port1.onmessage = performWorkUntilDeadline

let schedulePerformWorkUntilDeadline = () => {
  console.log("789")
  port.postMessage(null)
}

function flushWork(hasTimeRemaining, initialTime) {
  return workLoop(hasTimeRemaining, initialTime)
}

let currentTask

function workLoop(hasTimeRemaining, initialTime) {
  currentTask = taskQueue[0]
  while (currentTask != null) {
    console.log(shouldYieldToHost(), "shouldYieldToHost()")
    if (
      currentTask.expirationTime > initialTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      break
    }

    const callback = currentTask.callback
    callback()

    taskQueue.shift()

    currentTask = taskQueue[0]
  }

  if (currentTask != null) {
    return true
  } else {
    return false
  }
}

const frameInterval = 5

function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime
  if (timeElapsed < frameInterval) {
    return false
  }
  return true
}

requestHostCallback(flushWork)
