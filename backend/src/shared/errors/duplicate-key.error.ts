export class DuplicateKeyError extends Error {
  constructor(
    public readonly field: string,
  ) {
    super(`Duplicate value for field: ${field}`);
    this.name = "DuplicateKeyError";
  }
}