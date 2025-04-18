const $ = {
  classes: [],
};
const state = $;

const _transaction = require("./transaction");
const { $: $graph } = require("./graph");
const { event } = require("./event");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
const REFERENCE = require("./nuc/REFERENCE");
const serialize = require("./lib/serialize");

global.require = require;

function assign(scope, variable, evaluation, json = true) {
  let value;

  if (json) {
    value = serialize(eval(`(${evaluation})`), "state");
  } else {
    value = evaluation.toString();
  }

  return _transaction.register(`state.${variable}`, value);
}

function call(scope, fn, args = []) {
  const exec = `state.${fn}(${args.join(",")})`;
  return eval(exec);
}

function expression(scope, evaluation) {
  return eval(`(${evaluation.value})`);
}

function del(scope, variable) {
  return eval(`delete state.${variable}`);
}

const throwException = (scope, exception) => eval(`throw ${exception}`);

function clear() {
  for (const property in $) {
    delete $[property];
  }

  $["classes"] = [];
}

module.exports = {
  $,
  assign,
  call,
  expression,
  clear,
  delete: del,
  throw: throwException,
};
