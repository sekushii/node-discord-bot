/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'mongoose' {
  interface DocumentQuery<
    T,
    DocType extends import('mongoose').Document,
    QueryHelpers = {},
  > {
    mongooseCollection: {
      name: any;
    };
    cache(
      key: string | null,
      time: number | null,
    ): DocumentQuery<T[], Document> & QueryHelpers;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> {}
}
