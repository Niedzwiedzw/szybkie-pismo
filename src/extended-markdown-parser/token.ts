import { isNil, map, split } from 'lodash';
import {dbg} from "@/helpers";

export type Position = number;  // token start

export const TEMPLATE_BEGIN = '{{';
export const TEMPLATE_BEGIN_RE = '\\{\\{';

export const TEMPLATE_END = '}}';
export const TEMPLATE_END_RE = '\\}\\}';

export const LEGAL_VARIABLE_REGEX = '[\\w_]+';


export const withinTemplate = (re: string) => `${TEMPLATE_BEGIN_RE}\\s*${re}\\s*${TEMPLATE_END_RE}`;

const STARTS_WITH_TEMPLATE_REGEXP = new RegExp(`^${withinTemplate('.*?')}`);

export function leadingTemplate(input: string, position: number): Token | null {
  const match = input.match(STARTS_WITH_TEMPLATE_REGEXP);
  const result: string | null = isNil(match) || match.length === 0 ? null : match[0];

  return isNil(result)
    ? null
    : new Token(result, 0);  // TODO: fix position
}

export function getText(input: string, position: number): Token {
  for (let i=0; i < input.length - TEMPLATE_BEGIN.length; i++) {
    const slice = input.slice(i, i + TEMPLATE_BEGIN.length);
    if (slice === TEMPLATE_BEGIN) {
      return new Token(input.slice(0, i), i);
    }
  }

  return new Token(input, 0);  // TODO: fix position
}

export type TokenType = 'Variable' | 'Text' | 'If' | 'Else' | 'EndIf';

export const TOKEN_REGEX: {[key in TokenType]: RegExp} = {  // WARNING: UPDATE PRIORITY!!!!
  EndIf: new RegExp(withinTemplate('(fi)')),
  Else: new RegExp(withinTemplate('(else)')),
  If: new RegExp(withinTemplate(`if\\s+(${LEGAL_VARIABLE_REGEX})`)),
  Variable: new RegExp(withinTemplate(`(${LEGAL_VARIABLE_REGEX})`)),
  Text: new RegExp('.*?'),  // TODO: room for optimisation...
};

const TOKEN_PRIORITY: TokenType[] = [
  'EndIf',
  'Else',
  'If',
  'Variable',
  'Text',
];

export class Token {
  public constructor(
    public readonly raw: string,
    public readonly position: number,
  ) {}

  private _type: TokenType | null = null;
  public get type(): TokenType {
    if (!isNil(this._type)) {
      return this._type;
    }

    for (const [type, re] of map(TOKEN_PRIORITY, (t) => [t, TOKEN_REGEX[t]] as [TokenType, RegExp])) {
      if (re.test(this.raw)) {
        this._type = type;
        return type;
      }
    }

    return 'Text'  // TODO: better fallback?
  }

  public get value(): string | null {
    if (this.type === 'Text') { return this.raw; }
    const re = TOKEN_REGEX[this.type as TokenType];
    const match = re.exec(this.raw);
    if (isNil(match) || isNil(match[1])) { return null }
    return match[1];
  }
}
