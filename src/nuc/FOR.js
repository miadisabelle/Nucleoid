import * as _ from "lodash";
import * as graph from "../graph";
import * as state from "../state";

import { Evaluation } from "../lang/Evaluation";
import { Instruction } from "../Instruction";

// Import with type assertions since we don't know the exact types
const $BLOCK = require("../lang/$nuc/$BLOCK") as (
  statements: any[],
  returnLastValue?: boolean
) => any;
const $LET = require("../lang/$nuc/$LET") as (node: any, value: any) => any;

interface Scope {
  [key: string]: any;
}

class FOR {
  private index: number;
  public array!: string; 
  public variable!: { node: any };
  public statements!: any[]; 

  constructor() {
    this.index = 0;
  }

  run(scope: Scope): { next: any[] } | undefined {
    const array = state.expression(
      scope,
      new Evaluation(`state.${this.array}`)
    );

    if (!Array.isArray(array)) {
      throw new TypeError(`${this.array} is not iterable`);
    }

    if (this.index < array.length) {
      let list: any[] = [];
      let key = array[this.index].id;

      if (key !== undefined && graph.$[key]) {
        let object = array[this.index++].id;
        let statements = [$LET(this.variable.node, object)];
        list.push(
          $BLOCK(statements.concat(_.cloneDeep(this.statements)), true)
        );
      } else {
        this.index++;
      }

      list.push(new Instruction(scope, this, false, true, false, false));
      return { next: list };
    }

    return undefined; 
  }
}

export = FOR;
