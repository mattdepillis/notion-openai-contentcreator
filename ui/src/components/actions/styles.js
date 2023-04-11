import styled from "styled-components"

// grid container
export const GridContainer = styled.div`
  .grid {
    display: grid;
  }
  .grid-1 {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
`