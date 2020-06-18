class App {
  result(ctx, result) {
    ctx.body = result
  }

  success(ctx, message) {
    ctx.body = {
      code: 1,
      message: message
    };
  }

  error(ctx, message) {
    ctx.body = {
      code: 0,
      message: message
    };
  }
}

module.exports = App;
