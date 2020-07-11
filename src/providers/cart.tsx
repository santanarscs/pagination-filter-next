import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import api from '../services/api'
import Cart from '../components/Cart';

export interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category_id?: string
  images?: any[]
  principal_image: string;
}

interface CartState {
  items: Product[]
  total: number,
  loading?: boolean,
}

interface CartContextData {
  items: Product[],
  total: number;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateAmount: (id: string, amount: number) => Promise<void>
}
const CartContext = createContext<CartContextData>({} as CartContextData);
const CartProvider: React.FC = ({children}) => {
  const[isOpenModal, setIsOpenModal ] = useState<boolean>(false)
  const [loading ] = useState<boolean>(false)
  const [data, setData] = useState<CartState>({
    items: [],
    total: 0
  } as CartState);
  useEffect(() => {
    setData(() => {
      const items = localStorage.getItem('@store-cart:items');
      const total = localStorage.getItem('@store-cart:total');

      if(items) {
        return {items: JSON.parse(items), total: Number(total) || 0}
      }
      return {
        items: [],
        total: 0
      } as CartState;
    })
  },[])

  const openCart = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  const addToCart = useCallback(async (id: string) => {
    const response  = await api.get(`products/${id}`)

    setData((state) => {
      const isExistProduct = state.items.find(item => item.id === id)
      if(!isExistProduct) {
        const product = {
          ...response.data,
          quantity: 1
        }
        const data = {
          items: [...state.items, product],
          total: Number(state.total) + Number(product.price)
        }
        localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
        localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
        return data
      }
      const data = {
        items: state.items.map(item => item.id === isExistProduct.id ? Object.assign({}, item, {quantity: item.quantity + 1}) : item),
        total: state.total + Number(isExistProduct.price)
      }
      localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
      localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
      return data
    })

  }, [])

  const removeFromCart = useCallback(async (id: string) => {
    setData(state => {
      const productExist = state.items.find(item => item.id === id)
      const data = {
        items: state.items.filter(item => item.id !== productExist.id),
        total: state.total - Number(productExist.price * productExist.quantity)
      }
      localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
      localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
      return data;
    })
  },[])

  const updateAmount = useCallback(async (id: string, amount: number) => {
    if (amount <= 0) return;
    const {data: product} = await api.get<Product>(`products/${id}`)
    const stockAmount = product.quantity;
    if(amount > stockAmount) {
      alert('quantidade solicitada fora de estoque')
      return;
    }
    setData(state => {
      const findProduct = state.items.find(product => product.id === id);
      let total = state.total - Number(findProduct.price * findProduct.quantity);
      findProduct.quantity = amount
      total = total + Number(findProduct.price * findProduct.quantity)
      const items = state.items.filter(product => product.id !== findProduct.id )

      const data = {
        items: [...items, findProduct],
        total
      }
      localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
      localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
      return data
    })
  }, [])
  return (
    <>
      <CartContext.Provider
        value={{
          items: data.items,
          total: data.total,
          loading,
          addToCart,
          removeFromCart,
          updateAmount,
          openCart,
          closeCart
        }}
      >
        {children}
        {isOpenModal && <Cart />}
      </CartContext.Provider>
    </>
  )
}

function useCart(): CartContextData {
  const context = useContext(CartContext)
  if(!context){
    throw new Error('useCart must be used within an CartProvider')
  }
  return context;
}
export { CartProvider, useCart }
