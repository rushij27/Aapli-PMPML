import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes.tsx';
import { GeneralProvider } from './generalContextApi.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneralProvider>
      <RouterProvider router={router} />
    </GeneralProvider>
  </StrictMode>,
)
