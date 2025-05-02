
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { Home as HomeIcon, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <HomeIcon size={18} />
            Home
          </Button>
        </Link>
        <Link to="/manage-products">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={18} />
            Manage Products
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <ProductGrid products={products} searchTerm="" />
    </div>
  );
};

export default Home;
