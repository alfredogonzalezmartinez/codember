import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const filename = "users.txt";
const dataPath = path.join(dirname, filename);
const data = await readFile(dataPath, "utf-8");

// user separator is double line break
const userSeparator = /(\r?\n){2}/;
// field separator is a space or a line break
const fieldSeparator = /\s/;
// key value separator is a colon (:)
const keyValueSeparator = ":";

const requiredFields = ["usr", "eme", "psw", "age", "loc", "fll"];

const getKeyValue = (/** @type string */ keyValueString) =>
  keyValueString.split(keyValueSeparator);

const getUserEntries = (/** @type string */ userString) =>
  userString.split(fieldSeparator).map(getKeyValue);

const getUserFromEntries = (/** @type string[] */ userEntries) =>
  Object.fromEntries(userEntries);

const isValidUser = (/** @type Object */ user) =>
  requiredFields.every((field) => Object.hasOwn(user, field));

const users = data
  .split(userSeparator)
  .map(getUserEntries)
  .map(getUserFromEntries)
  .filter(isValidUser);

const userAmount = users.length;
const lastUsername = users.at(-1).usr;

console.log(`${userAmount}${lastUsername}`);
