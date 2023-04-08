import styled from "styled-components"

// styling for chakra accordion components
import { Accordion, AccordionButton, AccordionItem } from "@chakra-ui/react"

export const StyledAccordion = styled(Accordion)`
  border-radius: 10px;
  margin: 5px;
`

export const StyledAccordionButton = styled(AccordionButton)`
  opacity: 1;
  border-radius: 10px;
  &[disabled] {
    background-color: #FFFFFF;
    cursor: pointer;
  }
  :hover:not([disabled]) {
    background-color: #F9F9F1;
  }
`

export const StyledAccordionItem = styled(AccordionItem)`
  border-radius: 10px;
  ::before,
  ::after {
    border: 4px solid --chakra-colors-chakra-border-color;
  }
`
