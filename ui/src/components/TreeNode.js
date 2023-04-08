import { Fragment, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

/**
 * 
 * @param {} param0 
 * @param
 * @returns 
 */
const TreeNode = ({ tree, node }) => {
  // formats the emoji for rendering in front of the title, if exists
  const formatEmoji = (emoji) => emoji.length > 0 ? emoji + " " : emoji

  // TODO: better styling for the component; refactor into an Accordion component
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {node.title && (<span>{formatEmoji(node.emoji)}{node.title}</span>)}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {node.children.length > 0 &&
            node.children.map(childId => (
              <TreeNode key={childId} tree={tree} node={tree[childId]} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default TreeNode