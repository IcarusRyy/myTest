import {
  NoPriority,
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
  IdlePriority,
  CallbackNode,
  unstable_getFirstCallbackNode as getFirstCallbackNode,
  unstable_cancelCallback as cancelCallback,
  unstable_scheduleCallback as scheduleCallback,
  unstable_shouldYield as shouldYield,
} from "./schedulerPriorities"

type Priority =
  | typeof ImmediatePriority // 1
  | typeof UserBlockingPriority // 2
  | typeof NormalPriority // 3
  | typeof LowPriority // 4
  | typeof IdlePriority // 5

interface Work {
  priority: Priority
  count: number
}
const priority2UseList: Priority[] = [
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
]
const priority2Name = [
  "noop",
  "ImmediatePriority",
  "UserBlockingPriority",
  "NormalPriority",
  "LowPriority",
  "IdlePriority",
]

const root = document.getElementById("#root") as Element
const contentBox = document.querySelector("#container") as Element

const workList: Work[] = []

let prePriority: Priority = IdlePriority
let curCallback: CallbackNode | null

// 初始化优先级对应按钮
priority2UseList.forEach((priority) => {
  const btn = document.createElement("button")
  root.appendChild(btn)
  btn.innerText = priority2Name[priority]

  btn.onclick = () => {
    // 插入work
    workList.push({
      priority,
      count: 100,
    })
    scheduler()
  }
})

// 调度的逻辑
function scheduler() {
  // 当前可能存在正在调度的回调
  const cbNode = getFirstCallbackNode()
  // 取出优先级最高的work
  const curWork = workList.sort((w1, w2) => w1.priority - w2.priority)[0]

  if (!curWork) {
    // 没有work需要执行 退出调度
    curCallback = null
    cbNode && cancelCallback(cbNode)
    return
  }

  const { priority: curPriority } = curWork
  if (curPriority === prePriority) {
    // 有work正在进行，比较该work与正在进行的work的优先级
    // 如果优先级相同，则退出调度
    return
  }

  // 准备调度当前优先级最高的work
  // 调度之前 如果有work正在进行，则中断它
  cbNode && cancelIdleCallback(cbNode)

  // 调度当前优先级最高的work
  curCallback = scheduleCallback(curPriority, perform.bind(null, curWork))
}

// 执行具体的work
function perform(work: Work, didTimeout?: boolean) {
  // 是否需要同步执行，满足1、work是同步优先级；2、当前调度的任务已经过期，需要同步执行
  const needSync = work.priority === ImmediatePriority || didTimeout
  while ((needSync || !shouldYield()) && work.count) {
    work.count--
    // 执行具体的工作
    insertItem(work.priority + "")
  }
  prePriority = work.priority
  if (!work.count) {
    // 从workList中删除已经完成的work
    const workIndex = workList.indexOf(work)
    workList.splice(workIndex, 1)
    // 重置优先级
    prePriority = IdlePriority
  }

  const preCallback = curCallback
  // 调度完成后 如果callback变化，则代表这是新的work
  scheduler()

  const newCallback = curCallback
  if (newCallback && preCallback === newCallback) {
    // callback 没变 则代表是同一个work，只不过时间切片时间用光了(5ms)
    // 返回的函数会被Scheduler继续调用
    return perform.bind(null, work)
  }
}

const insertItem = (content: string) => {
  const ele = document.createElement("span")
  ele.innerText = `${content}`
  ele.className = `pri-${content}`
  doSomeBuzyWork(10000000)
  contentBox.appendChild(ele)
}

const doSomeBuzyWork = (len: number) => {
  let result = 0
  while (len--) {
    result += len
  }
}
