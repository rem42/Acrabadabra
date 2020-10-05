export class Regex {
  static readonly DATE = /\d{4}-\d{2}-\d{2}/;
  static readonly AMOUNT = /^[0-9]*\.?[0-9]*$/;
  static readonly NUMBERS = /[0-9]+/;
  static readonly TEXT_WITHOUT_ACCENT = /^\S[A-zÀ-ÿ\s'-]+$/;
}
