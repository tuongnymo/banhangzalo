'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getClientSideSupabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export type CartItem = {
  id: number;
  product_id: number;
  product_variant_id: number | null;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    sale_price: number | null;
    images: { image_url: string; is_primary: boolean }[];
  };
  variant?: {
    id: number;
    size?: { name: string } | null;
    color?: { name: string; color_code: string | null } | null;
    price: number | null;
  } | null;
};

type CartContextType = {
  items: CartItem[];
  isLoading: boolean;
  addItem: (productId: number, quantity: number, variantId?: number) => Promise<void>;
  updateItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartId, setCartId] = useState<number | null>(null);
  const { user } = useAuth();
  const supabase = getClientSideSupabase();
  const { toast } = useToast();

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Tính tổng tiền
  const subtotal = items.reduce((total, item) => {
    const price = item.variant?.price || item.product.sale_price || item.product.price;
    return total + price * item.quantity;
  }, 0);

  // Lấy hoặc tạo giỏ hàng khi user đăng nhập
  useEffect(() => {
    const getOrCreateCart = async () => {
      if (!user) {
        // Nếu không có user, lấy giỏ hàng từ localStorage
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setItems(JSON.parse(localCart));
        }
        setIsLoading(false);
        return;
      }

      // Nếu có user, lấy giỏ hàng từ database
      const { data: carts } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (carts) {
        setCartId(carts.id);
        // Lấy các sản phẩm trong giỏ hàng
        const { data: cartItems } = await supabase
          .from('cart_items')
          .select(`
            id, 
            product_id, 
            product_variant_id, 
            quantity,
            product:products(
              id, 
              name, 
              price, 
              sale_price,
              images:product_images(image_url, is_primary)
            ),
            variant:product_variants(
              id,
              price,
              size:sizes(name),
              color:colors(name, color_code)
            )
          `)
          .eq('cart_id', carts.id);

        if (cartItems) {
          setItems(cartItems as CartItem[]);
        }
      } else {
        // Tạo giỏ hàng mới nếu chưa có
        const { data: newCart } = await supabase
          .from('carts')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (newCart) {
          setCartId(newCart.id);
        }
      }

      setIsLoading(false);
    };

    getOrCreateCart();
  }, [user, supabase]);

  // Lưu giỏ hàng vào localStorage khi không có user
  useEffect(() => {
    if (!user && !isLoading) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user, isLoading]);

  // Thêm sản phẩm vào giỏ hàng
  const addItem = async (productId: number, quantity: number, variantId?: number) => {
    try {
      if (user && cartId) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingItemIndex = items.findIndex(
          item => item.product_id === productId && item.product_variant_id === (variantId || null)
        );

        if (existingItemIndex > -1) {
          // Nếu đã có, cập nhật số lượng
          const newQuantity = items[existingItemIndex].quantity + quantity;
          await updateItemQuantity(items[existingItemIndex].id, newQuantity);
        } else {
          // Nếu chưa có, thêm mới
          const { data, error } = await supabase
            .from('cart_items')
            .insert({
              cart_id: cartId,
              product_id: productId,
              product_variant_id: variantId || null,
              quantity,
            })
            .select(`
              id, 
              product_id, 
              product_variant_id, 
              quantity,
              product:products(
                id, 
                name, 
                price, 
                sale_price,
                images:product_images(image_url, is_primary)
              ),
              variant:product_variants(
                id,
                price,
                size:sizes(name),
                color:colors(name, color_code)
              )
            `)
            .single();

          if (error) {
            throw error;
          }

          setItems(prev => [...prev, data as CartItem]);
        }
      } else {
        // Xử lý cho người dùng chưa đăng nhập
        const existingItemIndex = items.findIndex(
          item => item.product_id === productId && item.product_variant_id === (variantId || null)
        );

        if (existingItemIndex > -1) {
          // Nếu đã có, cập nhật số lượng
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          setItems(newItems);
        } else {
          // Nếu chưa có, lấy thông tin sản phẩm và thêm vào giỏ hàng
          const { data: product } = await supabase
            .from('products')
            .select(`
              id, 
              name, 
              price, 
              sale_price,
              images:product_images(image_url, is_primary)
            `)
            .eq('id', productId)
            .single();

          let variant = null;
          if (variantId) {
            const { data: variantData } = await supabase
              .from('product_variants')
              .select(`
                id,
                price,
                size:sizes(name),
                color:colors(name, color_code)
              `)
              .eq('id', variantId)
              .single();
            variant = variantData;
          }

          const newItem: CartItem = {
            id: Date.now(), // Tạm thời dùng timestamp làm id
            product_id: productId,
            product_variant_id: variantId || null,
            quantity,
            product: product as CartItem['product'],
            variant: variant as CartItem['variant'],
          };

          setItems(prev => [...prev, newItem]);
        }
      }

      toast({
        title: 'Đã thêm vào giỏ hàng',
        description: 'Sản phẩm đã được thêm vào giỏ hàng của bạn.',
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng.',
        variant: 'destructive',
      });
    }
  };

  // Cập nhật số lượng sản phẩm
  const updateItemQuantity = async (itemId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItem(itemId);
        return;
      }

      if (user && cartId) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);

        if (error) {
          throw error;
        }
      }

      setItems(prev =>
        prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật số lượng sản phẩm.',
        variant: 'destructive',
      });
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = async (itemId: number) => {
    try {
      if (user && cartId) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) {
          throw error;
        }
      }

      setItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: 'Đã xóa sản phẩm',
        description: 'Sản phẩm đã được xóa khỏi giỏ hàng.',
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa sản phẩm khỏi giỏ hàng.',
        variant: 'destructive',
      });
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      if (user && cartId) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cartId);

        if (error) {
          throw error;
        }
      }

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa giỏ hàng.',
        variant: 'destructive',
      });
    }
  };

  const value = {
    items,
    isLoading,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
