module.exports = function useCors(options) {
  return async function cors(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", ctx.header.origin);
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length,Authorization,Accept,X-Requested-With"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set('Access-Control-Max-Age','60')
    ctx.set('Access-Control-Allow-Credentials', "true")
    if (ctx.method == "OPTIONS") {
      ctx.body = 200;
    } else {
      await next();
    }
  };
};
