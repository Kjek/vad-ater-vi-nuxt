export const toRegExp = (regExp: string | null) => {
  if (!regExp) {
    return;
  }
  return new RegExp(regExp.replace('/', '').replace(/\/\w+?$/, ''), regExp.split('/').slice(-1)[0]);
};
