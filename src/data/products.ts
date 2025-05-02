
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  views: number;
  sales: number;
  ratings: {
    average: number;
    count: number;
  };
  inStock: boolean;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    price: 3500,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Perfect for everyday use.",
    views: 120,
    sales: 45,
    ratings: {
      average: 4.8,
      count: 32
    },
    inStock: true,
    createdAt: "2023-10-12"
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    price: 6900,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "High-quality wireless earbuds with noise cancellation and long battery life. Comes with a charging case.",
    views: 8,
    sales: 12,
    ratings: {
      average: 4.5,
      count: 18
    },
    inStock: true,
    createdAt: "2023-11-05"
  },
  {
    id: 3,
    name: "Smart Watch Series X",
    price: 12500,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "Feature-packed smartwatch with heart rate monitor, GPS, and water resistance. Compatible with iOS and Android.",
    views: 210,
    sales: 78,
    ratings: {
      average: 4.7,
      count: 56
    },
    inStock: true,
    createdAt: "2023-09-20"
  },
  {
    id: 4,
    name: "Casual Cotton T-shirt",
    price: 1800,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "Comfortable 100% cotton t-shirt available in various colors. Perfect for casual wear.",
    views: 5,
    sales: 0,
    ratings: {
      average: 0,
      count: 0
    },
    inStock: true,
    createdAt: "2023-11-10"
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 2200,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and BPA-free.",
    views: 95,
    sales: 33,
    ratings: {
      average: 4.9,
      count: 27
    },
    inStock: true,
    createdAt: "2023-10-05"
  },
  {
    id: 6,
    name: "Professional Camera Tripod",
    price: 7500,
    image: "https://images.unsplash.com/photo-1520549233664-03f65c1d1327?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600",
    description: "Adjustable height tripod for DSLR and mirrorless cameras. Made from lightweight aluminum with quick-release plate.",
    views: 4,
    sales: 2,
    ratings: {
      average: 4.6,
      count: 5
    },
    inStock: true,
    createdAt: "2023-11-12"
  }
];

// Function to update product views
export const incrementProductViews = (productId: number): Product | null => {
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return null;
  }
  
  // Create a copy of the product with incremented views
  const updatedProduct = {
    ...products[productIndex],
    views: products[productIndex].views + 1
  };
  
  // Update the products array with the modified product
  products[productIndex] = updatedProduct;
  
  return updatedProduct;
};

// Function to add a new product
export const addProduct = (product: Omit<Product, 'id' | 'views' | 'sales' | 'ratings' | 'createdAt'>): Product => {
  // Find the highest id to ensure we create a unique one
  const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
  
  const newProduct: Product = {
    ...product,
    id: maxId + 1,
    views: 0,
    sales: 0,
    ratings: {
      average: 0,
      count: 0
    },
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  products.push(newProduct);
  return newProduct;
};

// Function to remove a product
export const removeProduct = (productId: number): boolean => {
  const initialLength = products.length;
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return false;
  }
  
  products.splice(productIndex, 1);
  return products.length !== initialLength;
};

