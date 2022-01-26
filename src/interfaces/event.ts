interface Event {
  canProcess(...args: unknown[]): boolean;
  process(...args: unknown[]): void;
}

export default Event;
