const genUserId = () => {
  const date = Date.now().toString();
  const str = Math.floor(Math.random() * 10000000)
    .toString()
    .split("")
    .map((i) => String.fromCharCode(97 + ~~i))
    .join("");

  return date + str;
};

const genRandomString = (len = 10, needSymbol = false) => {
  let res = "";
  const a = new Array(10).fill(0).map((_, i) => i);
  const b = new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65));
  const c = new Array(26).fill(0).map((_, i) => String.fromCharCode(i + 97));
  const d = needSymbol
    ? ["!", "@", "#", "$", " %", "^", "&", "*", ")", "(", "?", ",", ".", "~"]
    : [];
  const arr = [...a, ...b, ...c, ...d];
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * arr.length);
    res += arr[index];
  }
  return res;
};

module.exports = {
  genUserId,
  genRandomString
};
