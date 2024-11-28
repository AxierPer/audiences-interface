import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginLayout from "./layout/Layout"

export function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<LoginLayout><Home /></LoginLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
