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

export {};
