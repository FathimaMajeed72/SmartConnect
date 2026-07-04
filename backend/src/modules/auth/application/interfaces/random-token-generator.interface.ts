export interface RandomTokenGenerator {
  generate(length?: number): string;
}