export default defineNuxtPlugin(() => {
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
});
