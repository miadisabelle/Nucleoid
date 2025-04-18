import $ from "../lang/$nuc/$";
import Instruction from "../Instruction";
import NODE from "./NODE";
import Scope from "../Scope";

interface Statement {
  type?: string;
  id?: string;
  block?: {
    statements: Statement[];
  };
}

class BLOCK extends NODE {
  statements: Statement[];

  constructor(key: string) {
    super(key);
    this.statements = [];
  }

  run(scope: Scope): NODE[] {
    const newScope = new Scope(scope);
    newScope.block = this;
    return this.statements.map(
      (statement) =>
        new Instruction(newScope, statement, null, null, null, null)
    );
  }

  stage(instruction: Instruction): void {
    if (
      instruction.scope.block.type === undefined &&
      instruction.statement.type === "CLASS"
    ) {
      throw new SyntaxError(
        "Cannot define class declaration in non-class block"
      );
    }

    if (
      instruction.run &&
      !(instruction.statement instanceof $) &&
      instruction.statement.type !== "CLASS"
    ) {
      const statement = instruction.statement as Statement;
      const block = statement.block;

      if (block && statement.id) {
        block.statements = block.statements.filter(
          (s) => s.id !== statement.id
        );
      }

      this.statements.push(instruction.statement);
    }
  }
}

export default BLOCK;
