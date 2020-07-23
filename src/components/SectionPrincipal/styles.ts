import styled from 'styled-components';

export const Container = styled.section`
  height: 100vh;
  background: url('./home1.png') no-repeat center;
  background-size: cover;
  margin-bottom: 40px;
  > div {
    width: 1100px;
    padding:30px 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    h1 {
      margin: 60px 0 20px 0;
      font-size: 64px;
      color: ${({theme}) => theme.colors.white};
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.06em;
    }
    a {
      display: flex;
      align-items:center;
      justify-content: center;
      text-decoration: none;
      width: 200px;
      height: 60px;
      border-radius: 5px;
      color: ${({theme}) => theme.colors.white};
      background: ${({theme}) => theme.colors.primary};
      font-weight: bold;
      border: none;
      font-size: 18px;
      text-transform: uppercase;
    }
  }

  & + section {
    height: 400px;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      h1 {
        margin: 60px 0 20px 0;
        font-size: 48px;
      }
      a {
        width: 150px;
        height: 50px;
      }
    }
  }
`;
