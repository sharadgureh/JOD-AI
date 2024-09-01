import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './Pages/homepage/Homepage'
import Dashboard from './Pages/dashboard/Dashboard'
import Chatpage from './Pages/chatpage/Chatpage'
import RootLayout from './Layouts/rootLayout/RootLayout'
import DashboardLayout from './Layouts/dashboardLayouts/DashboardLayout'
import SignInPage from './Pages/login/SignInPage'
import Signup from './Pages/signup/Signup'

const router = createBrowserRouter([
  {
 element:<RootLayout/>,
 children:[
  {path:"/",element:<Homepage/>},
  {path:"/sign-in/*",element:<SignInPage/>},
  {path:"/sign-up/*",element:<Signup/>},

  {element:<DashboardLayout/>,
    children:[
      {path:"/dashboard",element:<Dashboard/>},
      {path:"/dashboard/chats/:id",element:<Chatpage/>}
    ]
  }
 ]
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
