
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { products, addProduct, removeProduct, Product } from '../data/products';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';

const ProductManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [localProducts, setLocalProducts] = useState([...products]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: 'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600',
    inStock: true
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || newProduct.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please provide a name and valid price.",
        variant: "destructive"
      });
      return;
    }

    const product = addProduct(newProduct);
    setLocalProducts([...products]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Product Added",
      description: `${product.name} has been added to the catalog.`
    });

    // Reset form
    setNewProduct({
      name: '',
      price: 0,
      description: '',
      image: 'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600',
      inStock: true
    });
  };

  const handleRemoveProduct = (productId: number, productName: string) => {
    if (window.confirm(`Are you sure you want to remove ${productName}?`)) {
      const removed = removeProduct(productId);
      
      if (removed) {
        setLocalProducts([...products]);
        toast({
          title: "Product Removed",
          description: `${productName} has been removed from the catalog.`,
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setNewProduct({
      ...newProduct,
      [name]: type === 'number' ? parseFloat(value) : value,
      inStock: name === 'inStock' ? value === 'true' : newProduct.inStock
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Home
        </button>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus size={18} />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (DZD)</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  placeholder="Product description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Status</label>
                <select
                  name="inStock"
                  value={newProduct.inStock.toString()}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Views</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3">
                  <Link to={`/product/${product.id}`} className="hover:text-primary hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{product.price.toLocaleString()} DZD</td>
                <td className="px-4 py-3">{product.views}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleRemoveProduct(product.id, product.name)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Remove product"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
