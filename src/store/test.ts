import { storeCache } from "./base"
export const testStore = storeCache((set, get) => ({
  scenes: [],
  testAdd: (newData: any) =>
    set((data: any) => {
      console.log(data, "testStore testAdd data")
      console.log(newData, "newData")
      console.log(JSON.parse(JSON.stringify(data)), "data")
      return { ...data, scenes: [...data.scenes, newData] }
    }),
}))
