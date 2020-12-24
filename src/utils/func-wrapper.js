// eslint-disable-next-line node/no-extraneous-require
class WrapperResult {
  constructor() {
    this.success = false;
    this.data = undefined;
    this.message = '';
  }
}
exports.funcWrapper = {
  throwError: (message, data = []) => {
    const e = new Error(message);
    e.name = 'CustomError';
    e.data = data;
    throw e;
  },
  ExecFnAsync: async (fn, successMessage) => {
    const r = new WrapperResult();
    try {
      let tempResult = await fn();
      r.success = true;
      r.data = tempResult;
      r.message = successMessage || '';
      return r;
    } catch (error) {
      r.success = false;
      r.message = error.name === 'CustomError' ? error.message : 'Unexpected Error';
      return r;
    }
  },
  ExecFn: (fn) => {
    const r = new WrapperResult();
    try {
      let tempResult = fn();
      r.success = true;
      r.data = tempResult.recordset;
      r.message = '';
      return r;
    } catch (error) {
      r.success = false;
      r.message = error.name === 'CustomError' ? error.message : 'Unexpected Error';
      return r;
    }
  },
};
