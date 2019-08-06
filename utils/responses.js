module.exports = {
  failed: (res, { code, message, data }) => {
    return res.json({
      status: {
        success: false,
        code: code,
        message: message,
      },
      result: data,
    });
  },
  success: (res, { code, message, data }) => {
    return res.json({
      status: {
        success: true,
        code: code,
        message: message,
      },
      result: data,
    });
  }
}
