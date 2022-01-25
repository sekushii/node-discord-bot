interface Event {
  canHandle(...args: unknown[]): boolean;
  handle(...args: unknown[]): void;
}

export default Event;
