declare global {
  interface Date {
    getWeek(): number;
    isPastSevenUTC(): boolean;
    today(): string;
  }

  interface String {
    getShortDate(): string;
    toSentenceCase(): string;
    toFullSentenceCase(): string;
    toDotNotation(): string;
    toRegExp(): RegExp | undefined;
  }
}

export {};
