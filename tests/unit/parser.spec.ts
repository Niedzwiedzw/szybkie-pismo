import {some} from 'lodash';
import {Lexer} from "@/extended-markdown-parser/lexer";
import {Block, findMatchingEndIfIndex, Parser} from "@/extended-markdown-parser/parser";
import {getBlock} from "@/test-helpers";

describe('Parser works', () => {
  it('Parses plain text properly', () => {
    const block = getBlock('Szanowne państwo, kochani moi...');
    expect(block.blocks.length).toEqual(1);
    expect(block.blocks[0].blocks.length).toEqual(1);
    expect(block.blocks[0].blocks[0].blocks.length).toEqual(1);
    expect(block.blocks[0].type).toEqual('TextBlock')
  });

  it('Parses a text with a variable', () => {
    const block = getBlock('Szanowne państwo, kochani moi... nazywam się {{ variable }} i pochodzę z Warmii');
    expect(block.blocks.length).toEqual(3);
    expect(block.blocks.map((b) => b.type)).toEqual(['TextBlock', 'VariableBlock', 'TextBlock'])
  });



  it('Parses an if block just fine', () => {
    const block = getBlock('Jestem {{ if prezydent }} Białostoczaninem {{ else }} Podlasianinem {{ fi }}');
    expect(block.blocks.length).toEqual(2);
    expect(block.blocks.map((b) => b.type)).toEqual(['TextBlock', 'IfElseBlock']);
  });
  const isIfElseBlock = (input: string): boolean => getBlock(input).type === 'IfElseBlock';
  const containsIfElseBlock = (input: string): boolean => some(getBlock(input).blocks, isIfElseBlock);
  it('parses advanced if-else blocks just fine too', () => {
    const text = '{{ if powsciagliwosc }}przepraszam ze tak powiedzialem{{ fi }}';
    expect(isIfElseBlock(text)).toBe(true);
    expect(isIfElseBlock('a' + text)).toBe(false);
    expect(getBlock('a ' + text).blocks.length).toEqual(2);
    expect(getBlock('a ' + text).blocks[0].type).toEqual('TextBlock');
    expect(getBlock('a ' + text).blocks[1].type).toEqual('IfElseBlock');
    expect(getBlock('a ' + text + ' a').blocks[1].type).toEqual('IfElseBlock');
    // expect(containsIfElseBlock('kurwa {{ if powsciagliwosc }}przepraszam ze tak powiedzialem{{ fi }}')).toBe(true);
  });

  it('if-else lookahead function works fine', () => {
    const text = 'Szanowne Panstwo... mamy dzisiaj {{ if wtorek }}wtorek{{ else }}wtorek{{ fi }} rano.';
    const tokens = (new Lexer(text).tokens());
    expect(findMatchingEndIfIndex(tokens, 3)).toEqual(5);
  });

});
