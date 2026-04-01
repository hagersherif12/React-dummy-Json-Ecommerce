import { RouterProvider } from 'react-router-dom'
import { Route } from './Router/router'
import { ProviderContext } from './context/providerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

function App() {
  return (
    <ProviderContext>
      <RouterProvider router={Route} />
    </ProviderContext>
  )
}

export default App
