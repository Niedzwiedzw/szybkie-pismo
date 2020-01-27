import {some, isEqual, cloneDeep, reverse, merge, keys, pick} from 'lodash';

/* eslint-disable no-console */
export function dbg<T>(input: T): T {
  console.debug(input);
  return input;
}

export const anyIsEq = (collection: any, thing: any): boolean => some(collection, (e) => isEqual(e, thing));

export function reversed<T>(collection: T[]): T[] {
  collection = cloneDeep(collection);
  reverse(collection);
  return collection;
}

export function merged<TObject, TSource>(object: TObject, source:TSource): TObject & TSource {
  object = cloneDeep(object);
  source = cloneDeep(source);
  return merge(object, source);
}

export function updateOwn<T, U>(source: T, newObj: U) {
  let newObject = merged(source, newObj);
  newObject = pick(newObject, keys(source)) as any;
  return newObject;
}
