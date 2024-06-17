import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { GlobalContextProvider } from './context/GlobalContext'

function App() {

  return (
    <GlobalContextProvider>
      <Navbar />
      <Outlet />
    </GlobalContextProvider>
  )
}

export default App