import React from 'react'

import { CartProvider } from './cart'

const AppProvider: React.FC = ({children}) => (
  <CartProvider>
    {children}
  </CartProvider>
)
export default AppProvider;