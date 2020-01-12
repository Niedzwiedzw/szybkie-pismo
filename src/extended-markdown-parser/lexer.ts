import {isNil} from 'lodash';
import {getText, leadingTemplate, Token} from "@/extended-markdown-parser/token";

export class Lexer {
  private cursor: number;
  public constructor(public input: string) {
    this.cursor = 0;
  }
  private get _input(): string { return this.input.slice(this.cursor) }
  public nextToken(): Token | null {
    if (this._input.length === 0) { return null; }
    let token = leadingTemplate(this._input, this.cursor) || getText(this._input, this.cursor);
    this.cursor += token.raw.length;
    return token;
  }

  public tokens(): Token[] {
    const tokens: Token[] = [];
    while (true) {
      const token = this.nextToken();
      if (isNil(token)) {
        return tokens;
      }
      tokens.push(token);
    }
  }
}
