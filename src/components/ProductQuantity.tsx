
import { Plus, Minus } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'w-7 h-7',
      text: 'text-sm',
    },
    md: {
      container: 'h-10',
      button: 'w-8 h-8',
      text: 'text-base',
    },
    lg: {
      container: 'h-12',
      button: 'w-10 h-10',
      text: 'text-lg',
    },
  };

  return (
    <div className={`flex items-center border border-gray-200 rounded-md ${sizeClasses[size].container}`}>
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`${sizeClasses[size].button} flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      </button>
      
      <div className={`flex-1 text-center ${sizeClasses[size].text} font-medium`}>
        {quantity}
      </div>
      
      <button
        onClick={onIncrease}
        className={`${sizeClasses[size].button} flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100`}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
      </button>
    </div>
  );
};

export default ProductQuantity;
