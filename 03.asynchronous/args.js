import { insertTableQuery, insertTableWrongQuery } from "./queries.js";

export const firstBook = {
  query: insertTableQuery,
  params: "スラスラ読める JavaScriptふりがなプログラミング",
  callback: function () {
    console.log(`ID: ${this.lastID}`);
  },
};

export const secondBook = {
  query: insertTableQuery,
  params: "初めてのJavaScript",
  callback: function () {
    console.log(`ID: ${this.lastID}`);
  },
};

export const firstBookWrong = {
  query: insertTableWrongQuery,
  params: "スラスラ読める JavaScriptふりがなプログラミング2",
  callback: function (err) {
    if (!err) {
      console.log(`ID: ${this.lastID}`);
    }
  },
};

export const secondBookWrong = {
  query: insertTableQuery,
  params: null,
  callback: function (err) {
    if (!err) {
      console.log(`ID: ${this.lastID}`);
    }
  },
};
