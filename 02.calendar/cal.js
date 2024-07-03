#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);

const argv = minimist(process.argv.slice(2));
const yearMonthValue = [argv.y, argv.m];
const today = new Date();
const year = yearMonthValue[0] || dayjs(today).$y;
const month = yearMonthValue[1] || dayjs(today).$M + 1;
const firstDay = dayjs(new Date(year, month, 1)).$D;
const lastDay = dayjs(new Date(year, month, 0)).$D;
const firstDayOfWeek = dayjs(`"${year}-${month}-${firstDay}"`).$W;

console.log(`${" ".repeat(7)}${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const createFirstDayToLastday = (lastDay) => {
  const monthOfDays = [];
  for (let i = 1; i <= lastDay; i++) {
    monthOfDays.push(i);
  }
  return monthOfDays;
};

const addLineBreaksToDays = () => {
  const allDays = createFirstDayToLastday(lastDay);
  const dayWithLineBreaks = allDays.map((day) => {
    const dayOfWeek = dayjs(`"${year}-${month}-${day}"`).$W;
    return dayOfWeek === 6 ? `${day}\n` : `${day} `;
  });
  return dayWithLineBreaks;
};

const addSpaceLessThanTen = (days) => {
  const daysValue = days.map((day) => {
    return day < 10 ? ` ${day}` : `${day}`;
  });
  return daysValue;
};

const adjustedFirstDayPosition = (days, firstDayOfWeek) => {
  const spaces = firstDayOfWeek * 3;
  return `${" ".repeat(spaces)}${days}`;
};

const outputCalendar = () => {
  const dayWithLineBreaks = addLineBreaksToDays();
  const dayWithSpaces = addSpaceLessThanTen(dayWithLineBreaks).join("");
  return adjustedFirstDayPosition(dayWithSpaces, firstDayOfWeek);
};

console.log(outputCalendar());
