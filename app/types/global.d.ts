declare global {
  interface Date {
    getWeek(): number;
    today(): string;
  }

  interface String {
    toSentenceCase(): string;
    toFullSentenceCase(): string;
    toDotNotation(): string;
    toRegExp(): RegExp | undefined;
  }
}

export {};
