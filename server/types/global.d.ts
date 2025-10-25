declare global {
  interface Date {
    getWeek(): number;
    isPastSevenUTC(): boolean;
  }

  interface String {
    getShortDate(): string;
    toSentenceCase(): string;
    toFullSentenceCase(): string;
    toDotNotation(): string;
    toRegExp(): RegExp | undefined;
  }
}

Date.prototype.getWeek = function () {
  const weekOne = new Date(this.getFullYear(), 0, 4);
  return Math.ceil(((this.valueOf() - weekOne.valueOf()) / 86400000 + weekOne.getDay() - 1) / 7);
};

Date.prototype.isPastSevenUTC = function () {
  return this.getUTCHours() >= 7;
};

String.prototype.getShortDate = function () {
  const today = new Date();
  if (today.getDay() === 0) {
    today.setDate(today.getDate() - 1);
  }
  const mondayThisWeek = today.getDate() - today.getDay() + 1;
  return new Date(
    today.setDate(mondayThisWeek + sweDays.indexOf(this as SwedishDay))
  ).toLocaleDateString('se-SE', {
    month: '2-digit',
    day: '2-digit',
  });
};

String.prototype.toSentenceCase = function () {
  if (!this) {
    return '';
  }
  const trimmed = this.trim();
  if (trimmed.length === 0) {
    return '';
  }
  const firstChar = trimmed.charAt(0).toUpperCase();
  const rest = trimmed.slice(1).toLowerCase();

  return `${firstChar}${rest}`;
};

String.prototype.toFullSentenceCase = function () {
  if (!this) {
    return '';
  }
  const sentences = this.trim().split(/[.?!]/g);
  const sentenceCase = sentences.map((sentence) => {
    if (!sentence) {
      return '';
    }
    const trimmed = sentence.trim();
    if (trimmed.length === 0) {
      return '';
    }
    const firstChar = trimmed.charAt(0).toUpperCase();
    const rest = trimmed.slice(1).toLowerCase();

    return `${firstChar}${rest}`;
  });

  return sentenceCase.join('. ') + '.';
};

String.prototype.toDotNotation = function () {
  if (!this) {
    return '';
  }
  return this.trim().replaceAll(/\s/g, '.').toLocaleLowerCase();
};

String.prototype.toRegExp = function () {
  if (!this) {
    return undefined;
  }
  return new RegExp(this.replace('/', '').replace(/\/\w+?$/, ''), this.split('/').slice(-1)[0]);
};

export {};
