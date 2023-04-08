import { Fragment } from 'react'
import {
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

import {
  StyledAccordion,
  StyledAccordionButton,
  StyledAccordionItem 
} from '../styles/chakraComponentStyles'

/**
 * 
 * @param {} param0
 * @param
 * @returns 
 */
const TreeNode = ({ tree, node }) => {
  // formats the emoji for rendering in front of the title, if exists
  const formatEmoji = (emoji) => emoji.length > 0 ? emoji + " " : emoji

  // TODO: refactor into an Accordion component
  return (
    <StyledAccordion allowMultiple>
      <StyledAccordionItem isDisabled={node.children.length === 0}>
        {({ isDisabled }) => (
          <Fragment>
            <h2>
              <StyledAccordionButton style={{ opacity: 1 }}>
                <Box as="span" flex='1' textAlign='left'>
                  {node.title && (<span>{formatEmoji(node.emoji)}{node.title}</span>)}
                </Box>
                {!isDisabled && <AccordionIcon />}
              </StyledAccordionButton>
            </h2>
            <AccordionPanel pb={4} isDisabled>
              {node.children.length > 0 &&
                node.children.map(childId => (
                  <TreeNode key={childId} tree={tree} node={tree[childId]} />
              ))}
            </AccordionPanel>
          </Fragment>
        )}
      </StyledAccordionItem>
    </StyledAccordion>
  )
}

export default TreeNode