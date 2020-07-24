import styled from "styled-components";

export const Container = styled.div`
display: flex;
ol {
  list-style: none;
  margin-right: 10px;
  li {
    padding: 10px 0;
    cursor: pointer;
  }
}
ul {
  flex: 1;
  list-style: none;
  background: #f4f4f4;
  padding: 10px;
  li{
    padding: 10px 0;
    p {
      line-height: 32px;
    }
  }
}

`
export const CreditCardContainer = styled.div`
display: flex;
justify-content: space-between;
`
export const FormCreditCard = styled.div`
display: flex;
flex-direction: column;
margin-right: 10px;
input {
  height: 35px;
  border-radius: 5px;
  border: 1px solid ${({theme}) => theme.colors.gray1};
  background: ${({theme}) => theme.colors.white};
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
}
> div {
  display: flex;
  flex-direction: column;
}
`
