import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen font-maven'>
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App;
