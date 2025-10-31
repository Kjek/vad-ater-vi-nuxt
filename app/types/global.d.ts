declare global {
  interface Date {
    getWeek(): number;
    isPastSevenUTC(): boolean;
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
