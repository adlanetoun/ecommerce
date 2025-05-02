
import ProductGrid from '../components/ProductGrid';
import { useSearchContext } from '../context/SearchContext';
import { products } from '../data/products';
import Home from './Home';

const Index = () => {
  const { searchTerm } = useSearchContext();
  
  if (searchTerm) {
    return <ProductGrid products={products} searchTerm={searchTerm} />;
  }
  
  return <Home />;
};

export default Index;
