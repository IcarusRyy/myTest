import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
// console.log(root._internalRoot.containerInfo, "root")
root.render(<App />)
