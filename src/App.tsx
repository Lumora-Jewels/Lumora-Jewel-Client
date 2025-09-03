import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { LoaderProvider } from './conntexts/LoaderContext';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import AboutUs from './pages/AboutPage';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
          <div className="flex flex-col min-h-screen font-spectral text-white bg-white items-center justify-between font-josefin">
            <div className='w-full'>
              <NavBar />
            </div>
            <LoaderProvider>
              <div className="flex-grow bg-white h-full w-full pt-17 max-w-boundary mx-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/items/:id" element={<ItemsPage/>}/>
                  <Route path= "/about" element={<AboutUs/>}/>
                  <Route path= "/contact" element={<Contact/>}/>
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