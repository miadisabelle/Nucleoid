//REVISIT
type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | Map<SerializableValue, SerializableValue>
  | Set<SerializableValue>
  | SerializableObject
  | Array<SerializableValue>;

interface SerializableObject {
  id?: string;
  [key: string]: SerializableValue;
}

interface AccumulatorObject {
  [id: string]: SerializableObject;
}

function serialize(
  input: SerializableValue,
  source: string,
  acc: AccumulatorObject = {}
): string {
  const state = require("../state").$;
  const graph = require("../graph").$;
  let result: string;

  switch (true) {
    case input instanceof Array:
      result = `[${(input as Array<SerializableValue>)
        .map((i) => serialize(i, source, acc))
        .join(",")}]`;
      break;
    case input instanceof Map:
      result = `new Map(${serialize(
        [...(input as Map<SerializableValue, SerializableValue>)],
        source,
        acc
      )})`;
      break;
    case input instanceof Set:
      result = `new Set(${serialize(
        [...(input as Set<SerializableValue>)],
        source,
        acc
      )})`;
      break;
    case input instanceof Date:
      result = `new Date(${(input as Date).getTime()})`;
      break;
    case input instanceof String:
    case input instanceof Number:
    case input instanceof Boolean:
      result = JSON.stringify(input);
      break;
    case input instanceof Function:
    case input instanceof RegExp:
      result = (input as RegExp)
        .toString()
        .replace(/\n/g, " ")
        .replace(/ +/g, " ");
      break;
    case input instanceof Object:
      const obj = input as SerializableObject;
      if (
        source === "state" &&
        obj.id !== undefined &&
        state[obj.id] !== undefined
      ) {
        result = `state.${obj.id}`;
        break;
      } else if (
        source === "graph" &&
        obj.id !== undefined &&
        graph[obj.id] !== undefined
      ) {
        result = `graph['${obj.id}']`;
        break;
      } else if (obj.id !== undefined && acc[obj.id] !== undefined) {
        result = `{$ref:{id:'${obj.id}',source:'${source}'}}`;
        break;
      } else {
        if (obj.id !== undefined) {
          acc[obj.id] = obj;
        }
      }

      result = `{${Object.entries(obj)
        .map(([key, value]) => `${key}:${serialize(value, source, acc)}`)
        .join(",")}}`;
      break;
    default:
      result = JSON.stringify(input);
  }

  return result;
}

export default serialize;
