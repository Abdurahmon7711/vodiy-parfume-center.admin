export const date = (d) => {
  const date2 = new Date(d);
  const year = date2.getFullYear();
  var month = date2.getMonth() + 1;
  var day = date2.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return day + "/" + month + "/" + year;
};

export const time = (dat) => {
  const d = new Date(dat);
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return hour + ":" + minute + ":" + second;
};
