import styled, { css } from "styled-components";

export const Button = styled.button<{
  secondary?: boolean;
  contained?: boolean;
  active?: boolean;
}>`
  border-radius: 5px;
  border: 1px solid darkgray;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 0 20px;
  font-family: "Homer Simpson Revised", sans-serif;
  font-size: 1.5rem;
  margin: 1rem;

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #fdd835;
      color: whitesmoke;
    `}

  ${(props) =>
    props.secondary &&
    css`
      background-color: #d1b07d;
      color: whitesmoke;
    `}

  ${(props) =>
    props.contained &&
    css`
      width: 45%;
      min-width: 250px;
      height: 50px;
      margin: 1rem auto;
      text-shadow: 2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000,
        -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000,
        -2px 0px 0 #000000, 0px -2px 0 #000000;
    `}
`;
