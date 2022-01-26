interface Factory<T> {
  getInstance(...args: unknown[]): T;
}

export default Factory;
