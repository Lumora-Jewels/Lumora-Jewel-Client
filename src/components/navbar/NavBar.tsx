import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import AuthModal from "../auth/AuthModal";
import NotificationDropdown from "../notifications/NotificationDropdown";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-navy/30 backdrop-blur-xl shadow-md">
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-navy hover:text-orange">
            Lumora
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-navy font-medium hover:text-orange transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-navy" />
                  <span className="text-navy font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-navy hover:text-orange transition-colors duration-200"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-navy font-medium hover:text-orange transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-orange transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {isAuthenticated && (
              <NotificationDropdown />
            )}
            
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-navy hover:text-orange transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>

          <button
            className="md:hidden text-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-light/95 backdrop-blur-lg shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-navy font-medium hover:text-orange transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="border-t border-navy/20 pt-4 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 mb-3">
                    <User size={20} className="text-navy" />
                    <span className="text-navy font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-navy hover:text-orange transition-colors duration-200"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left text-navy font-medium hover:text-orange transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-orange transition-colors duration-200 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </nav>
  );
};

export default NavBar;
