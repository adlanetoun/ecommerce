
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useSearchContext } from '../context/SearchContext';

const Header = () => {
  const { cart } = useCart();
  const { searchTerm, setSearchTerm } = useSearchContext();

  const cartItemsCount = cart.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="text-primary font-bold text-2xl mb-3 sm:mb-0">
          DZ STORE
        </Link>

        <div className="w-full sm:w-auto flex items-center justify-between space-x-4">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-800" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
