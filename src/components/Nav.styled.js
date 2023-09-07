import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #ede6e6;
  box-shadow: 10px 5px 5px grey;
  ul {
    list-style: none;
    display: flex;
  }

  li {
    margin: 20px;
  }

  a {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: black;

    &.active {
      color: orange;
    }
  }
`;
