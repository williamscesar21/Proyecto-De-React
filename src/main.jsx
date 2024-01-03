import React from 'react'
import ReactDOM from 'react-dom/client'
import './resources/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Home from './pages/Home.jsx'
import Aside from './components/Header.jsx'
import logout from './components/Logout.jsx'
import Perfil from './components/Profile.jsx'
import RegistroUsuarios from './pages/NuevosUsers.jsx'
import ChatAi from './components/ChatAi.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
    {logout?<BrowserRouter>
    <Aside/>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/perfil' Component={Perfil}/>
        <Route path='/admin/UsersRegister' Component={RegistroUsuarios}/>
        <Route path='/chatbot' Component={ChatAi}/>
      </Routes>
    </BrowserRouter>:
    <BrowserRouter>
      <Routes>
        <Route path='/registro'  Component={Registro}/>
        <Route path='/login'  Component={Login}/>
        <Route path='/'  Component={Login}/>
      </Routes>
    </BrowserRouter>}
  
    
  </React.StrictMode>,
)
