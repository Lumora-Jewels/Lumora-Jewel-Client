import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { LoaderProvider } from './conntexts/LoaderContext';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
          <div className="flex flex-col min-h-screen font-spectral text-white bg-black items-center justify-between">
            <div className='w-full'>
              <NavBar />
            </div>
            <LoaderProvider>
              <div className="flex-grow bg-white h-full w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </div>
            </LoaderProvider>
            <div className='w-full'>
              <Footer />
            </div>
          </div>
    </BrowserRouter>
  )
}

export default App