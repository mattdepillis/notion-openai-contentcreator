import styled from "styled-components"

// styling for chakra accordion components
import { Accordion, AccordionButton, AccordionItem } from "@chakra-ui/react"

export const AccordionContainer = styled.div`
  border-weight: 2px;
  border-radius: 10px;
  border-color: red;
  background-color: dodgerblue;
`
export const StyledAccordion = styled(Accordion)`
  border-radius: 10px;
`

export const StyledAccordionItem = styled(AccordionItem)`
  border-radius: 10px;
`

export const StyledAccordionButton = styled(AccordionButton)`
  opacity: 1;
  border-radius: 10px;
  &[disabled] {
    background-color: #F9F9F1;
  }
`

