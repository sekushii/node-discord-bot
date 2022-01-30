abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }
}

export default CustomError;
