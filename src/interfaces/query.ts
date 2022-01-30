type Query<T> = {
  [P in keyof T]?: T[P] | { $regex: RegExp };
};

export default Query;
