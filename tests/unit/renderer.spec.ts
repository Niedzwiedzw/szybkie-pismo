import {isNil, cloneDeep} from 'lodash';
import {getBlock} from "@/test-helpers";
import {renderer} from "@/extended-markdown-parser/renderer";
import {dbg} from "@/helpers";

describe('Renderer spits out correct templates', () => {
  it('handles a plain text properly', () => {
    const text = 'O jaki ty mądry on prezydentem chciał być nooo i został ugułem prezydentem śmietników';
    const block = getBlock(text);
    const [args, fn] = renderer(block);
    expect(fn(args)).toEqual(text);
  });

  it('handles a variable properly', () => {
    const text = 'To jest szanowne państwo mój pełnomocnik, yyyy Pan {{ pelnomocnik_name }}';
    const block = getBlock(text);
    let [kwargs, fn] = renderer(block.blocks[1]);

    expect(kwargs.variables!.pelnomocnik_name).toBe(null);
    expect(fn({variables: {pelnomocnik_name: 'Wojciech'}})).toEqual('Wojciech');
    [kwargs, fn] = renderer(block);
    expect(kwargs.variables!.pelnomocnik_name).toBe(null);
    expect(fn({variables: {pelnomocnik_name: 'Wojciech'}}))
      .toEqual('To jest szanowne państwo mój pełnomocnik, yyyy Pan Wojciech')
  });
  const text = 'ty kurwa{{ if powsciagliwosc }} przepraszam ze tak powiedzialem{{ fi }} komunistyczny szczurze';
  const block = getBlock(text);
  let [kwargs, fn] = renderer(block);
  it('basic if creates correct kwargs', () => {
    expect(kwargs.ifStatements!.powsciagliwosc).toBe(false);
  });
  it('renders properly for false condition', () => {
    expect(fn({ifStatements: {powsciagliwosc: false}}))
      .toEqual('ty kurwa komunistyczny szczurze');
  });
  it('renders properly for true condition', () => {
    expect(fn({ifStatements: {powsciagliwosc: true}}))
      .toEqual('ty kurwa przepraszam ze tak powiedzialem komunistyczny szczurze');
  });
});
