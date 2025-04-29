import config from "./src/config";
import datastore from "./src/datastore";
import express from "./src/express";
import nucleoid from "./src/nucleoid";
import * as openapi from "./src/lib/openapi";
import test from "./src/lib/test";

const { start, run } = nucleoid;
export default {
  express,
  start,
  run,
  config,
  openapi,
  test,
  datastore,
};
