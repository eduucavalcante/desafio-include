import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import AppRouters from './routers/AppRouters'
import "flowbite";
import './tailwind.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <AppRouters/>
    </BrowserRouter>
  </StrictMode>
)
