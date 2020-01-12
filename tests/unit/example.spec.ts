import {isNil} from 'lodash';
import {Token, TOKEN_REGEX, withinTemplate} from "@/extended-markdown-parser/token";
import {Lexer} from "@/extended-markdown-parser/lexer";

describe('Tokenization helper functions work as intended', () => {
  it('withinTemplate function works', () => {
    const regex = withinTemplate('(w)');
    const re = new RegExp(regex);
    expect(re.test('{{ w }}')).toBe(true);
    expect(re.test('{{w }}')).toBe(true);
    expect(re.test('{{ w}}')).toBe(true);
    expect(re.test('{{ w          }}')).toBe(true);
  })
});

describe('Regexes work', () => {
  it('Variable regex works', () => {
    expect(TOKEN_REGEX['Variable'].test('{{ some_variable }}')).toBe(true);
    expect(TOKEN_REGEX['Variable'].test('{{ some-variable }}')).toBe(false);
  });
  it('If regex works', () => {
    expect(TOKEN_REGEX['If'].test('{{ if dupa }}')).toBe(true);
    expect(TOKEN_REGEX['If'].test('{{ some-variable }}')).toBe(false);
  });
  it('Else regex works', () => {
    expect(TOKEN_REGEX['Else'].test('{{ else }}')).toBe(true);
    expect(TOKEN_REGEX['Else'].test('{{ some-variable }}')).toBe(false);
  });
});

describe('Tokens are assigned proper type', () => {
  expect((new Token('{{ variable }}', 0)).type).toEqual('Variable');
  expect((new Token('{{ if variable }}', 0)).type).toEqual('If');
  expect((new Token('Szanowne państwo, kochani moi...', 0)).type).toEqual('Text');
});

describe('Lexer spits out proper token stream', () => {
  it('Properly recognizes a variable', () => {
    const input = 'Wzywam człowieka o imieniu {{ IMIE }} do zapłaty.';
    const lexer = new Lexer(input);
    const tokens = lexer.tokens();
    expect(tokens.length).toEqual(3);
    expect(tokens.map((t) => t.type)).toEqual(['Text', 'Variable', 'Text']);

    expect(tokens.map((t) => t.value).map((v) => isNil(v) ? '' : v).join(''))
      .toEqual('Wzywam człowieka o imieniu IMIE do zapłaty.')
  });

  it('Properly recognizes an IF statement', () => {
    const input = 'Ej człowieku... {{ if is_good }}czy ty jesteś normalny?{{ else }}Jesteś spaniałą osobą! {{ fi }}';
    const lexer = new Lexer(input);
    const tokens = lexer.tokens();
    expect(tokens.length).toEqual(6);
    expect(tokens.map((t) => t.type)).toEqual(['Text', 'If', 'Text', 'Else', 'Text', 'EndIf']);
  });
});
