import { extend } from "immutability-helper";

extend(
  "$filter",
  function (filter: (value: unknown) => boolean, value: unknown[]) {
    return value.filter(filter);
  }
);

/**
 * Isomorphic map method.
 */
function map<T>(
  collection: T[] | Record<string, T>,
  map: (value: T, key: number | string) => unknown
) {
  if (Array.isArray(collection)) {
    return collection.map(map);
  }
  return Object.fromEntries(
    Object.keys(collection).map((key) => [key, map(collection[key], key)])
  );
}

extend("$map", function <
  T
>(mapper: (value: T, key: number | string) => unknown, collection: any) {
  return map(collection, mapper);
});
