/* eslint-disable no-console */
export function dbg<T>(input: T): T {
  console.debug(input);
  return input;
}
