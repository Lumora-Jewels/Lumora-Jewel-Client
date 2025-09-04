import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import { LoaderProvider } from './conntexts/LoaderContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutUs from './pages/AboutPage';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen font-spectral text-white bg-white items-center justify-between font-josefin">
              <div className='w-full'>
                <NavBar />
              </div>
              <LoaderProvider>
                <div className="flex-grow bg-white h-full w-full pt-17 max-w-boundary mx-auto">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/items/:id" element={<ItemsPage/>}/>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path= "/about" element={<AboutUs/>}/>
                    <Route path= "/contact" element={<Contact/>}/>
                  </Routes>
                </div>
              </LoaderProvider>
              <div className='w-full'>
                <Footer />
              </div>
            </div>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App