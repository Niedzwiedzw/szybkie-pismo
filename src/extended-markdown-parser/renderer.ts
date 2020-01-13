import {merge, reduce, map, isEqual, some, findLast} from 'lodash';
import {Block} from "@/extended-markdown-parser/parser";
import {anyIsEq, reversed} from "@/helpers";

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

export function renderer(block: Block): Renderer {
  if (block.type === 'VariableBlock') {
    return [
      {variables: {[block.primitive.value!]: null}, ifStatements: {}},
      (kwargs) => `${kwargs.variables![block.primitive.value!]}`,
    ]
  }

  if (block.type === 'IfElseBlock') {
    const tokenTypes = block.tokens.map((t) => t.type);
    if (anyIsEq(
      [
        ['If', 'Text', 'EndIf'],
        ['If', 'EndIf'],
      ], tokenTypes)) {
      return renderIfBlockWithoutElse(block)
    }
    if (anyIsEq(
      [
        ['If', 'Text', 'Else', 'Text', 'EndIf'],
        ['If', 'Text', 'Else', 'EndIf'],
        ['If', 'Else', 'Text', 'EndIf'],
        ['If', 'Else', 'EndIf'],
      ], tokenTypes)) {
      return renderIfBlockWithElse(block)
    }

    return [{}, () => block.tokens.map((t) => t.value).join('')]
  }

  if (block.type === 'TextBlock') {
    return [
      {variables: {}, ifStatements: {}},
      (): string => block.primitive.value!,
    ]
  }

  // default case: recursively match the insides
  return reduce(
    map(block.blocks, renderer),
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
