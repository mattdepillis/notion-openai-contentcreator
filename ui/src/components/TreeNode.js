import React, { Fragment, useEffect, useState } from "react"

const TreeNode = ({ tree, node }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpansion = (isExpanded) => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => console.log("here", node, tree), [node, tree])

  // TODO: figure out a better way to render the tree for my inspection atm
  return (
    <Fragment>
      <div onClick={() => handleExpansion(isExpanded)}>
        {node.title && (<p>{node.title}</p>)}
        {node.children && (
          <button>{isExpanded ? '-' : '+'}</button>
        )}
      </div>
      {isExpanded &&
        node.children.length > 0 &&
        node.children.map(childId => (
          <TreeNode key={childId} tree={tree} node={tree[childId]} />
        ))}
    </Fragment>
  )
}

export default TreeNode