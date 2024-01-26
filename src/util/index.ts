export const testComplete = (data, store) => {
  // const { scenes, testAdd } = store
  const { testAdd, scenes } = store.getState()
  console.log(data, "testComplete data")
  console.log(scenes, "testComplete scenes")
  if (!scenes) return
  console.log(JSON.parse(JSON.stringify(scenes)), "complete arr")
  const mapObj = new Set(scenes.map((scene) => scene.id))
  console.log(JSON.parse(JSON.stringify(Array.from(mapObj))), "complete mapObj")
  if (!mapObj.has(data.id)) {
    console.log(data, "添加")
    testAdd(data)
  }
}
