import _ from "lodash";

interface Node {
  type: string;
  [key: string]: any;
}

interface MemberExpression extends Node {
  type: "MemberExpression";
  object?: Node;
  property?: Node;
  computed: boolean;
}

interface Identifier extends Node {
  type: "Identifier";
  name: string;
}

type ExpressionNode = MemberExpression | Identifier | Node;

function root(node: ExpressionNode): ExpressionNode {
  let current = node as MemberExpression;
  
  while (
    current.object && 
    !["Identifier", "ThisExpression", "Literal"].includes(current.object.type)
  ) {
    current = current.object as MemberExpression;
  }
  
  return current;
}

function append(source: ExpressionNode | null | undefined, target: ExpressionNode | null | undefined): ExpressionNode {
  const clonedSource = source ? _.cloneDeep(source) : null;
  const clonedTarget = target ? _.cloneDeep(target) : null;
  
  if (!source) {
    return clonedTarget as ExpressionNode;
  }
  
  if (!target) {
    return clonedSource as ExpressionNode;
  }
  
  const empty: MemberExpression = {
    type: "MemberExpression",
    computed: false,
  };
  
  if (clonedTarget.type === "Identifier") {
    empty.property = clonedTarget;
    empty.object = clonedSource;
    
    return empty;
  } else if (clonedTarget.type === "MemberExpression") {
    const first = root(clonedTarget as MemberExpression) as MemberExpression;
    
    empty.property = first.object;
    empty.object = clonedSource;
    first.object = empty;
    
    return clonedTarget;
  } else {
    throw new Error("Invalid expression type");
  }
}

export { append, root };