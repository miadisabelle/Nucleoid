import BLOCK$INSTANCE from "./BLOCK$INSTANCE";
import Instruction from "../Instruction";
import NODE from "./NODE";
import Scope from "../Scope";
import { v4 as uuid } from "uuid";

class BLOCK$CLASS extends NODE {
  statements: Array<{
    id: string;
    class?: Record<string, unknown>;
    instance?: Record<string, unknown>;
    statements?: Array<unknown>;
    declaration?: BLOCK$CLASS;
  }>;

  class!: {
    instances: Record<string, Record<string, unknown>>;
    declarations: Record<string, BLOCK$CLASS>;
  };

  id!: string;
  type: string;

  constructor(key: unknown) {
    super(typeof key === "string" ? key : String(key));
    this.statements = [];
    this.type = "CLASS";
  }

  run(scope: Scope): NODE | NODE[] | null {
    let instances: Record<string, unknown>[];
    const statements: Instruction[] = [];

    const instance = scope.$instance as Record<string, unknown> | undefined;

    if (instance) {
      instances = [instance];
    } else {
      instances = Object.values(this.class.instances);
    }

    for (const instance of instances) {
      const statement = new BLOCK$INSTANCE(uuid()) as {
        id: string;
        class?: {
          instances: Record<string, Record<string, unknown>>;
          declarations: Record<string, BLOCK$CLASS>;
        };
        instance?: typeof instance;
        statements?: Array<{
          id: string;
          class?: Record<string, unknown>;
          instance?: Record<string, unknown>;
          statements?: Array<unknown>;
          declaration?: BLOCK$CLASS;
        }>;
        declaration?: BLOCK$CLASS;
      };

      statement.class = this.class;
      statement.instance = instance;
      statement.statements = this.statements;
      statement.declaration = this;

      const instanceScope = new Scope(scope.block ? scope : null);
      instanceScope.$instance = this;

      statements.push(
        new Instruction(instanceScope, statement, true, true, false, false)
      );
      statements.push(
        new Instruction(instanceScope, statement, false, false, true, true)
      );
    }

    return statements.length > 0 ? statements : null;
  }

  graph(): NODE[] | null {
    this.class.declarations[this.id] = this;
    return null;
  }
}

export default BLOCK$CLASS;
