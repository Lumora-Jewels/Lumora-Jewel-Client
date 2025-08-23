const Footer = () => {
  return (
    <footer className="w-full bg-navy text-light">
      <div className="max-w-boundary mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="border">
          <h2 className="text-2xl font-italianno text-gold">Lumora Jewels</h2>
          <p className="mt-2 text-sm font-josefin text-light/80">
            Timeless gold, watches, and jewelry designed for elegance.
          </p>
        </div>

        <div className="border">
          <h3 className="text-lg font-josefin font-semibold text-gold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="#shop" className="hover:text-orange">Shop</a></li>
            <li><a href="#collections" className="hover:text-orange">Collections</a></li>
            <li><a href="#about" className="hover:text-orange">About Us</a></li>
            <li><a href="#contact" className="hover:text-orange">Contact</a></li>
          </ul>
        </div>

        <div className="border">
          <h3 className="text-lg font-josefin font-semibold text-gold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Email: <a href="mailto:info@lumora.com" className="hover:text-orange">info@lumora.com</a></li>
            <li>Phone: <a href="tel:+94112233445" className="hover:text-orange">+94 11 223 3445</a></li>
            <li>Address: Chilaw, Sri Lanka</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-light/20 text-center py-4 text-sm text-light/60">
        © {new Date().getFullYear()} Lumora Jewels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
