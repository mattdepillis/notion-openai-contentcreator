import React, { Fragment, useState } from "react"

const TreeNode = ({ tree, node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpansion = (isExpanded) => {
    setIsExpanded(!isExpanded);
  }

  return (
    <Fragment>
      <div onClick={() => handleExpansion(isExpanded)}>
        {node.title}
        {node.children && (
          <button>{isExpanded ? '-' : '+'}</button>
        )}
      </div>
      {isExpanded &&
        node.children &&
        node.children.map(childId => (
          <TreeNode key={childId} node={tree[childId]} />
        ))}
    </Fragment>
  )
}

export default TreeNode