import styled from 'styled-components';

export const Container = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({theme}) => theme.colors.gray1};
`;

export const Content = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 24px;
    width: 300px;
  }
  form {
    input {
      height: 50px;
      border: 1px solid ${({theme}) => theme.colors.gray1};
      padding: 10px;
      border-radius: 5px;
      margin-right: 20px;
    }
    button {
      width: 200px;
      height: 50px;
      border: none;
      border-radius: 5px;
      text-transform: uppercase;
      font-size: 18px;
      color:  ${({theme}) => theme.colors.white};
      font-weight: bold;
      background:  ${({theme}) => theme.colors.primary};
    }
  }
`
