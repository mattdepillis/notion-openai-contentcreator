import React, { Fragment, useState } from "react"

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const TreeNode = ({ tree, node }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpansion = (isExpanded) => {
    setIsExpanded(!isExpanded)
  }

  const formatEmoji = (emoji) => emoji.length > 0 ? emoji + " " : emoji

  // TODO: figure out a better way to render the tree for my inspection atm
  return (
    <Fragment>
      <div onClick={() => handleExpansion(isExpanded)}>
        {node.title && (<span>{formatEmoji(node.emoji)}{node.title}</span>)}
        {node.children.length > 0 && (
          <button>{isExpanded ? '-' : '+'}</button>
        )}
      </div>
      {isExpanded &&
        node.children.length > 0 &&
        node.children.map(childId => (
          <div style={{'paddingLeft': '5px'}}>
            <TreeNode key={childId} tree={tree} node={tree[childId]} />
          </div>
        ))}
    </Fragment>
  )
}

export default TreeNode