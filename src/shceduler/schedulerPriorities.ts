export type PriorityLevel = 0 | 1 | 2 | 3 | 4 | 5
export type FrameCallbackType = (
  didTimeout: boolean
) => FrameCallbackType | void

export interface CallbackNode {
  callback: FrameCallbackType
  priorityLevel: number
  expirationTime: number
  next: CallbackNode | null
  prev: CallbackNode | null
}

let deadline = 0
const perf = window.performance

const getCurrentTime: () => DOMHighResTimeStamp = perf.now.bind(perf)

// TODO: Use symbols?
export const NoPriority = 0
export const ImmediatePriority = 1
export const UserBlockingPriority = 2
export const NormalPriority = 3
export const LowPriority = 4
export const IdlePriority = 5

export const unstable_cancelCallback = (callbackNode: CallbackNode): any => {}
export const unstable_shouldYield = (): boolean => {
  return getCurrentTime() >= deadline
}

export const unstable_getFirstCallbackNode = (): any => {}
export const unstable_scheduleCallback = (
  priorityLevel: PriorityLevel,
  callback: any,
  options?: { delay: number }
): any => {}
