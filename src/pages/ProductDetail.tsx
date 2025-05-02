
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Edit } from 'lucide-react';
import { products, Product, incrementProductViews } from '../data/products';
import { useCart } from '../context/CartContext';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const productId = parseInt(id);
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      // Update product views in the products array and get updated product
      const updatedProduct = incrementProductViews(productId);
      
      if (updatedProduct) {
        setProduct(updatedProduct);
        setEditedProduct(updatedProduct);
        setIsNewArrival(updatedProduct.views < 10);
        
        // Log the view increment
        console.log(`Product view incremented for product #${id}`);
      }
    } else {
      navigate('/not-found');
    }
  }, [id, navigate]);

  const handleEditToggle = () => {
    if (isEditing && product && editedProduct) {
      // Save changes
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = editedProduct;
        setProduct(editedProduct);
        toast({
          title: "Changes saved",
          description: "Product details have been updated successfully.",
        });
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedProduct) return;
    
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Products
        </button>
        
        <Button 
          variant={isEditing ? "default" : "outline"} 
          onClick={handleEditToggle}
          className="flex items-center gap-2"
        >
          <Edit size={18} />
          {isEditing ? "Save Changes" : "Edit Product"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {isNewArrival && (
              <Badge className="bg-primary hover:bg-primary">New Arrival</Badge>
            )}
            {product.inStock ? (
              <Badge variant="outline" className="text-green-600 border-green-600">In Stock</Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">Out of Stock</Badge>
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProduct?.name || ''}
              onChange={handleInputChange}
              className="text-3xl font-bold text-gray-800 mb-4 w-full border-b border-gray-300 focus:outline-none focus:border-primary px-2 py-1"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          )}
          
          <div className="text-2xl font-bold text-gray-900 mb-5">
            {isEditing ? (
              <input
                type="number"
                name="price"
                value={editedProduct?.price || 0}
                onChange={handleInputChange}
                className="w-32 border-b border-gray-300 focus:outline-none focus:border-primary px-2 py-1"
              />
            ) : (
              product.price.toLocaleString()
            )}
            <span className="text-sm font-normal ml-1">DZD</span>
          </div>
          
          {isEditing ? (
            <textarea
              name="description"
              value={editedProduct?.description || ''}
              onChange={handleInputChange}
              className="w-full h-32 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
            />
          ) : (
            <p className="text-gray-600 mb-6">{product.description}</p>
          )}
          
          <div className="flex flex-wrap gap-8 text-sm text-gray-500 mb-8">
            <div>
              <p><strong>Views:</strong> {product.views}</p>
              <p><strong>Sales:</strong> {product.sales}</p>
            </div>
            
            <div>
              <p>
                <strong>Rating:</strong> {product.ratings.average > 0 
                  ? `${product.ratings.average.toFixed(1)} (${product.ratings.count} reviews)` 
                  : 'No ratings yet'
                }
              </p>
              <p><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock || isEditing}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
