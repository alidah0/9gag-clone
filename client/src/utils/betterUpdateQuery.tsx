import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cach: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cach.updateQuery(qi, (data) => fn(result, data as any) as any);
}
