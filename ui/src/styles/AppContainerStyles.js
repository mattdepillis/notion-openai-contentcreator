import styled from 'styled-components'

export const WelcomeContainer = styled.div`
  // * flexbox
  display: flex;
  flex-direction: row;

  // * inner content placement
  align-items: center;
  gap: 30px;
  justify-content: center;

  // * sizing
  font-size: 2.5em;
  width: 100%;

  // * margin, padding, border
  border: 1px solid red;
  margin-top: 10px;
`

export const Name = styled.p`
  height: fit-content;
`