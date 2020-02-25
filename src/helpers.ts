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

export function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

// convert the output of atob() back to a Unicode string
export function fromBinary(binary: string) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

