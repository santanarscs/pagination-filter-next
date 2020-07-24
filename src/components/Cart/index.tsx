import {  useCallback } from "react";
import Router from 'next/router'
import { FiX, FiTrash, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../../providers/cart";
import { formatPrice } from "../../utils/formatPrice";

import { Container, Content, HeaderContent,ButtonGroup, SubmitButton, FooterContent} from './styles'

const Cart: React.FC = () => {
  const { items, removeFromCart, total, updateAmount, closeCart } = useCart()

  const handleRemoveItem = useCallback(async (id: string) => {
    await removeFromCart(id);
  }, [])

  const handleUpdateAmount = useCallback(async (id: string, amount: number) => {
    await updateAmount(id, amount)
  },[])

  const handleCheckout = useCallback(() => {
    closeCart();
    Router.push('/checkout')
  },[])

  return (
    <Container>
      <Content>
        <HeaderContent>
          <h1>Carrinho</h1>
          <button type="button" onClick={closeCart}><FiX size={30} /></button>
        </HeaderContent>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <img src={`http://localhost:3333/files/${item.principal_image}`} alt={item.name}/>
              <div>
                <strong>{item.name}</strong>
                <ButtonGroup>
                  <button onClick={() => handleUpdateAmount(item.id, item.quantity - 1)}>
                    <FiMinus size={10}/>
                  </button>
                    <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateAmount(item.id, item.quantity + 1)}>
                    <FiPlus size={10} />
                  </button>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </ButtonGroup>
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>
                <FiTrash size={25}/>
              </button>
            </li>
          ))}
        </ul>
        <FooterContent>
          <h1>Subtotal</h1>
          <span>{formatPrice(total)}</span>
        </FooterContent>
        <SubmitButton onClick={handleCheckout}>Finalizar Compra</SubmitButton>
      </Content>
    </Container>
  )
}

export default Cart;
