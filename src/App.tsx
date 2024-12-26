import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import reduxStore from "./redux/store"
import Login from "./page/Login"
import './index.scss'
import RegisterForm from "./page/Register"
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </>
  )
}
export default App
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<React.StrictMode>
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>
</React.StrictMode >)