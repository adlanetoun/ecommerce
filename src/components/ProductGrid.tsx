
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../data/products';

interface ProductGridProps {
  products: Product[];
  searchTerm?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, searchTerm = '' }) => {
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
