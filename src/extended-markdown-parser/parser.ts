import {isNil, first, last} from 'lodash';
import {Token} from "@/extended-markdown-parser/token";


export function findMatchingEndIfIndex(tokens: Token[], start: number): number | null {
  let ifs = 1;
  for (let i = start; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'If') { ifs++; }
    if (token.type === 'EndIf') { ifs--; }
    if (ifs === 0) { return i; }
  }

  return null;
}

export type BlockType = 'TextBlock' | 'IfElseBlock' | 'VariableBlock';

export class Block {
  public constructor(public tokens: Token[]) {}
  public get blocks(): Block[] {
    const blocks: Block[] = [];
    for (let i = 0; i < this.tokens.length; i++)
    {
      const token = this.tokens[i];

      if (token.type === 'Text') { blocks.push(new Block([token])); }
      if (token.type === 'Variable') { blocks.push(new Block([token])); }
      if (token.type === 'If') {
        const matchingEndIf = findMatchingEndIfIndex(this.tokens, i + 1);
        if (isNil(matchingEndIf)) {
          blocks.push(new Block([new Token(this.tokens.map((t) => t.raw).join(''), -1, true)]));
          break;
        }
        blocks.push(new Block(this.tokens.slice(i, matchingEndIf + 1)));
        i = matchingEndIf;
      }
    }

    return blocks;
  }

  public get type(): BlockType | undefined {
    if (this.tokens.length === 1 && this.tokens[0].type === 'Text') { return 'TextBlock' }
    if (this.tokens.length === 1 && this.tokens[0].type === 'Variable') { return 'VariableBlock' }
    if (first(this.tokens)?.type === 'If' && last(this.tokens)?.type === 'EndIf') { return 'IfElseBlock' }
  };

  public get primitive(): Token {
    if (this.tokens.length !== 1) {
      throw "This is not a primitive block";
    }
    return this.tokens[0];
  }
}

export class Parser {
  public constructor(public input: Token[]) {}
  public get block(): Block {
    return new Block(this.input)
  }
}
