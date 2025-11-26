export const toRegExp = (regExp: string | null) => {
  if (!regExp) {
    return;
  }
  return new RegExp(regExp.replace('/', '').replace(/\/\w+?$/, ''), regExp.split('/').slice(-1)[0]);
};

export const toSentenceCase = (value: string | undefined | null) => {
  if (!value) {
    return '';
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return '';
  }
  const firstChar = trimmed.charAt(0).toUpperCase();
  const rest = trimmed.slice(1).toLowerCase();

  return `${firstChar}${rest}`;
};
