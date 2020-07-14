import styled from "styled-components";
import { FiLock, FiTruck, FiCreditCard } from "react-icons/fi";
import DayPicker, { DayModifiers } from 'react-day-picker';
import Link from "next/link";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Navbar = styled.header`
  width: 100%;
  background: ${({theme}) => theme.colors.gray2};
  color: ${({theme}) => theme.colors.text};
  height: 70px;
  display: flex;
  align-items: center;
`
const NavbarContent = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-left: auto;
    svg {
      margin-right: 15px;
    }
  }
`;
const Content = styled.div`
  width: 1100px;
  padding: 30px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 24px;
  }
  > a {
    margin-bottom: 40px;
    color: ${({theme}) => theme.colors.gray1};
  }
`
const Row = styled.div`
  display: flex;
  > span {
    margin-left: auto;
  }
`
const InformationDetail = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 20px;
`;

const DetailOrder = styled.div`
  width: 300px;
  margin-left: auto;
  ul{
    list-style:none;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    li {
      padding: 16px;
      h2{
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
      }
      select {
        margin-top: 20px;
        width: 100%;
        height: 35px;
        background: transparent;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid ${({theme}) => theme.colors.gray1};
      }
    }
    li + li {
      border-top: 1px solid #d9d9d9;
    }
  }
  > button {
    margin-top: 20px;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background: ${({theme}) => theme.colors.green};
    color: ${({theme}) => theme.colors.white};
  }
`;

const Payment: React.FC = () => {
  return (
    <Container>
      <Navbar>
        <NavbarContent>
          <h2>Minha loja</h2>
          <div>
            <FiLock size={30} />
            <span>Compra 100% segura</span>
          </div>
        </NavbarContent>
      </Navbar>
      <Content>
        <h1>Finalizar Compra</h1>
        <Link href="/checkout">
          <a>Voltar para o carrinho</a>
        </Link>
        <Row>
          <InformationDetail>
            <h3>Dados de entrega</h3>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              // disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              // onMonthChange={handleMonthChange}
              // selectedDays={selectedDate}
              // onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />

          </InformationDetail>
          <DetailOrder>
            <ul>
              <li>
                <h2>Resumo do pedido</h2>
              </li>
              <li>
                <div>Item do pedido</div>
              </li>
              <li>
                <Row>
                  <h2>Subtotal</h2>
                  <span>R$ 49,90</span>
                </Row>
              </li>

              <li>
                <Row>
                  <h2>Total</h2>
                  <span>R$ 49,90</span>
                </Row>
              </li>
            </ul>
            <button>Finalizar compra</button>
          </DetailOrder>
        </Row>
      </Content>
    </Container>
  )
}

export default Payment;
