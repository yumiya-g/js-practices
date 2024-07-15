#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);

const year = minimist(process.argv.slice(2)).y || dayjs().year();
const month = minimist(process.argv.slice(2)).m || dayjs().month() + 1;

console.log(`${" ".repeat(7)}${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const createAllDatesInMonth = (lastDay) => {
  const monthOfDays = [];
  for (let i = 1; i <= lastDay; i++) {
    monthOfDays.push(i);
  }
  return monthOfDays;
};

const outputCalendar = (year, month) => {
  const allDays = createAllDatesInMonth(
    dayjs([year, month]).endOf("month").date(),
  );
  const adjustAllDates = allDays.map((day) => {
    if (day === 1) {
      const spaces = dayjs([year, month]).day() * 3 + 2;
      day = day.toString().padStart(spaces, " ");
    } else if (1 < day && day < 10) {
      day = day.toString().padStart(2, " ");
    }
    return dayjs([year, month, day]).day() === 6 ? day + "\n" : day + " ";
  });
  return adjustAllDates.join("");
};

console.log(outputCalendar(year, month));
