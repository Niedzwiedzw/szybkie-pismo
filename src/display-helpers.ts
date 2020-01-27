import {values, flatten, map, keys, filter, first, toPairs, fromPairs, mapValues, cloneDeep, isNil, uniq} from 'lodash';
import {RenderArgs} from "@/extended-markdown-parser/renderer";

export const DELIMITER = '__';

type Prefix = string | null;

export function pickByPrefix(kwargs: RenderArgs, prefix: Prefix): RenderArgs {
  return fromPairs(
    map(
      toPairs(kwargs),
      ([k, v]) => [k, fromPairs(filter(toPairs(v), ([k2, v2]) => getPrefix(k2) === prefix))],
    ),
  );
}

export function getPrefix(key: string): Prefix {
  const prefix = first(key.split(DELIMITER));
  if (isNil(prefix) || prefix === key) { return null; }
  return prefix
}

export function byPrefix(kwargs: RenderArgs): RenderArgs[] {
  const allKeys = flatten(map(values(kwargs), keys));
  const prefixes = uniq(map(allKeys, getPrefix));
  return map(prefixes, p => pickByPrefix(cloneDeep(kwargs), p));
}

export type KeysByPrefix = {[key in keyof RenderArgs]: string[]};
export function keysByPrefix(kwargs: RenderArgs): KeysByPrefix[] {
  return map(byPrefix(kwargs), (k) => mapValues(k, keys))
}
