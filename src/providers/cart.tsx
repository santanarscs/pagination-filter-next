import React, { createContext, useState, useCallback, useContext, useEffect } from 'react'
import api from '../services/api'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category_id?: string
  images?: any[]
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
  addToCart: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateAmount: (id: string, amount: number) => Promise<void>
}
const CartContext = createContext<CartContextData>({} as CartContextData);
const CartProvider: React.FC = ({children}) => {
  const [loading, setLoading ] = useState<boolean>(false)
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
          total: state.total + Number(product.price)
        }
        localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
        localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
        return data
      }
      const data = {
        items: state.items.map(item => item.id === isExistProduct.id ? Object.assign({}, item, {quantity: item.quantity + 1}) : item),
        total: state.total + isExistProduct.price
      }
      localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
      localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
      return data
    })

  }, [])
  const removeFromCart = useCallback(async (id: string) => {
    setData(state => {
      const productExist = state.items.find(item => item.id === id)
      if(productExist.quantity > 1) {
        const data = {
          items: state.items.map(item => item.id === productExist.id ? Object.assign({}, item, {quantity: item.quantity - 1}) : item),
          total: state.total - productExist.price
        }
        localStorage.setItem('@store-cart:items', JSON.stringify(data.items));
        localStorage.setItem('@store-cart:total', JSON.stringify(data.total));
        return data
      }
      const data = {
        items: state.items.filter(item => item.id !== productExist.id),
        total: state.total - productExist.price
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
      console.log('quantidade solicitada fora de estoque')
      return;
    }
    setData(state => {
      const productIndex = state.items.findIndex(product => product.id === id);
        state.items.splice(productIndex, 1)
        product.quantity = amount
        return { ...state, items: [...state.items, product] }
    })
  }, [])
  return (
    <>
      <CartContext.Provider
        value={{items: data.items, total: data.total, loading, addToCart, removeFromCart, updateAmount}}
      >
        {children}
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