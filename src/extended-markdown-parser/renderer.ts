import {merge, reduce, findIndex} from 'lodash';
import {Block} from "@/extended-markdown-parser/parser";
import {anyIsEq, merged, reversed} from "@/helpers";
import {Token} from "@/extended-markdown-parser/token";

export interface RenderArgs {
  variables?: {
    [key: string]: string | null,
  },
  ifStatements?: {
    [key: string]: boolean,
  },
}

export type RenderFn = (kwargs: RenderArgs) => string;

export type Renderer = [RenderArgs, RenderFn];

export function mergeRenderes(renderers: Renderer[]): Renderer {
  return reduce(
    renderers,
    ([masterKwargs, masterFn]: Renderer, [kwargs, fn]: Renderer) => {
      const newKwargs =  merge(masterKwargs, kwargs);
      return [
        newKwargs,
        (kwargs: RenderArgs) => `${masterFn(kwargs)}${fn(kwargs)}`,
      ]
    },
    [{}, () => ''],
  )
}

export function renderIfBlockWithoutElse(block: Block): Renderer {
  const [ifBlock, nextBlock, endIfBlock] = block.tokens;
  const condition = ifBlock.value!;
  const text = nextBlock.type === 'Text' ? nextBlock.value! : '';
  return [
    {ifStatements: {[condition]: false}},
    (kwargs) => kwargs.ifStatements![condition] ? text : '',
  ]
}

export function renderIfBlockWithElse(block: Block): Renderer {
  const tokens = block.tokens;
  const condition = tokens[0].value!;
  const textTrue = tokens[1].type === 'Text' ? tokens[1].value! : '';
  const rev = reversed(tokens);
  const textFalse = rev[1].type === 'Text' ? rev[1].value! : '';

  return [
    {ifStatements: {[condition]: false}},
    (kwargs) => kwargs.ifStatements![condition] ? textTrue : textFalse,
  ]
}

export function getIfElseBlocks(block: Block): [Block, Block] {
  const tokens = block.tokens.slice(0, block.tokens.length -1).slice(1);
  let elseIdx: number | null = findIndex(tokens, (t) => t.type === 'Else');

  return  elseIdx === -1
    ? [new Block(tokens), new Block([new Token('', -1)])]  // TODO: gahhh...
    : [new Block(tokens.slice(0, elseIdx)), new Block(tokens.slice(elseIdx))]
}

export function renderer(block: Block): Renderer {
  if (block.type === 'VariableBlock') {
    return [
      {variables: {[block.primitive.value!]: null}, ifStatements: {}},
      (kwargs) => `${kwargs.variables![block.primitive.value!]}`,
    ]
  }

  if (block.type === 'IfElseBlock') {
    const [[kwargsTrue, fnTrue], [kwargsFalse, fnFalse]] = getIfElseBlocks(block).map(renderer);
    const kwargs = merged<RenderArgs, RenderArgs>(
      merged(kwargsTrue, kwargsFalse),
      {ifStatements: {[block.primitive.value!]: false}},
    );

    return [
      kwargs,
      (kwargs) => kwargs.ifStatements![block.primitive.value!]
        ? fnTrue(kwargs)
        : fnFalse(kwargs),
    ];
  }

  if (block.type === 'TextBlock') {
    return [
      {variables: {}, ifStatements: {}},
      (): string => block.primitive.value!,
    ]
  }

  // default case: recursively match the insides
  return mergeRenderes(block.blocks.map(renderer))
}
