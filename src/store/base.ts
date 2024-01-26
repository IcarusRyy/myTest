import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"
export const storeCache = (options: StateCreator<any>, attrs?: any) => {
  const storeCache = attrs ? create(persist(options, attrs)) : create(options)
  return storeCache
}
