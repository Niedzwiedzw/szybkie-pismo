import * as showdown from 'showdown';
import {RenderArgs, renderer, Renderer} from "@/extended-markdown-parser/renderer";
import {Lexer} from "@/extended-markdown-parser/lexer";
import {Parser} from "@/extended-markdown-parser/parser";

const CONVERTER = new showdown.Converter();

export function getRenderer(input: string): Renderer {
  if (input.length === 0) { return [{variables: {}, ifStatements: {}}, () => ''] }
  const tokens = (new Lexer(input)).tokens();
  const mainBlock = (new Parser(tokens)).block;
  return renderer(mainBlock);
}

export class DynamicText {
  constructor(public markdownPlus: string) {}
  public render(args: Array<string> = []): string {
    return CONVERTER.makeHtml(this.markdownPlus);
  }
  public get renderer(): Renderer {
    const [kwargs, fn] = getRenderer(this.markdownPlus);
    return [
      kwargs,
      (kwargs: RenderArgs) => CONVERTER.makeHtml(fn(kwargs)),
    ]
  }
}
