import Factory from './factory';

interface Handler<T> {
  getFactory(): Factory<T>;
  handle(...args: unknown[]): void;
}

export default Handler;
