import styled from "styled-components";

export const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 70%;
  margin: 0.5rem 3rem;
  padding: 1rem;
  border: 1px solid darkgrey;
  box-shadow: 4px 4px 5px darkgrey;
  border-radius: 10px;
  background-color: whitesmoke;
`;

export const QuoteText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 1rem auto;
  padding: 1rem;
  min-height: 5rem;
`;

export const QuoteAuthor = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
  color: #333;
  margin: 1rem auto;
  padding: 0;
  min-height: 3rem;
`;

export const Input = styled.input`
  width: 60%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 20px;
  font-size: 1.5rem;
  margin: 1rem auto;
  font-family: "Homer Simpson Revised", sans-serif;
`;
