import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";
dayjs.locale(ja);

const argv = minimist(process.argv.slice(2));
const setYearMonth = [argv.y, argv.m];

const today = new Date();

const year = setYearMonth[0] || dayjs(today).$y;
const month = setYearMonth[1] || dayjs(today).$M + 1;
const firstDay = dayjs(new Date(year, month, 1)).$D;
const lastDay = dayjs(new Date(year, month, 0)).$D;
const firstDayOfWeek = dayjs(`"${year}-${month}-${firstDay}"`).$W;
const weekDays = "日 月 火 水 木 金 土";

// 年月・曜日を表示
console.log(`${" ".repeat(7)}${month}月 ${year}`);
console.log(weekDays);

//　月の初日から最終日までを生成
const createFirstDayToLastday = (lastDay) => {
  let monthOfDays = [];
  for (let i = 1; i <= lastDay; i++) {
    monthOfDays.push(i);
  }
  return monthOfDays;
};

// カレンダー日付を出力する
const outputcalendar = () => {
  // 改行を付ける
  const breakedWeekLine = addBreakWeekLine();
  // 10未満の日付に半角スペースをつける
  const addSpacedDays = addSpaceLessThanTen(breakedWeekLine).join("");
  // 初日の位置を調整する
  return adjustedFirstDayPosition(addSpacedDays, firstDayOfWeek);
};

const addBreakWeekLine = () => {
  const allDays = createFirstDayToLastday(lastDay);
  let weekLine = [];
  allDays.forEach((d) => {
    const dayOfWeek = dayjs(`"${year}-${month}-${d}"`).$W;
    weekLine.push(dayOfWeek === 6 ? `${d}\n` : `${d} `);
  });
  return weekLine;
};

const addSpaceLessThanTen = (days) => {
  let daysValue = [];
  days.forEach((d) => {
    daysValue.push(d < 10 ? ` ${d}` : `${d}`);
  });

  return daysValue;
};

const adjustedFirstDayPosition = (days, firstDayOfWeek) => {
  const spaces = firstDayOfWeek * 3;
  return `${" ".repeat(spaces)}${days}`;
};

console.log(outputcalendar());
