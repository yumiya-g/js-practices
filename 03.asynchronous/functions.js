import sqlite3 from "sqlite3";
const createDB = () => new sqlite3.Database("database");
export let db = createDB();
export const recreateDB = () => {
  db = createDB();
};

export const promiseRun = (query, params = [], callback = null) =>
  new Promise((resolve, reject) => {
    if (callback === null) {
      callback = skipCallback(resolve);
    }
    const wrappedCallback = executeCallbackWrapper(resolve, reject, callback);
    db.run(query, params, wrappedCallback);
  });

const skipCallback = (resolve) => {
  return function () {
    resolve(this);
  };
};

const executeCallbackWrapper = (resolve, reject, callback) => {
  return function (err) {
    callback.call(this, err);
    if (err) {
      reject(err);
    } else {
      resolve(this);
    }
  };
};

export const promiseEach = (query, ...args) =>
  new Promise((resolve) => {
    const { params, callback, complete } = parseArguments(args);
    const originComplete = complete;
    const wrappedComplete = executeCompleteWrapper(originComplete, resolve);
    db.each(query, params, callback, wrappedComplete);
  });

const parseArguments = (args) => {
  const isFirstArgFunction = typeof args[0] === "function";
  if (isFirstArgFunction) {
    return { params: [], callback: args[0], complete: args[1] };
  } else {
    return {
      params: args[0],
      callback: args[1],
      complete: args[2],
    };
  }
};

const executeCompleteWrapper = (originComplete, resolve) => {
  return function (err) {
    if (typeof originComplete === "function") {
      originComplete();
    }
    if (err) {
      console.error(err.message);
      resolve(err);
    } else {
      resolve(this);
    }
  };
};
