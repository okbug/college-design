const paramPaser = async (ctx) => {
  return new Promise((resolve) => {
    const obj = {};
    ctx.req.addListener("data", (data) => {
      const str = data.toString();
      if (str.startsWith('{') || str.startsWith('[')) {
        resolve(JSON.parse(str))
        return;
      }
      str.split("&").forEach((s) => {
        const [key, value] = s.split("=");
        obj[key] = value;
      });
      
      resolve(obj);
    });
  })
};


module.exports = {
    paramPaser
}