import * as showdown from 'showdown';

const CONVERTER = new showdown.Converter();

export class DynamicText {
  constructor(public markdownPlus: string) {}
  public render(args: Array<string> = []): string {
    return CONVERTER.makeHtml(this.markdownPlus);
  }
}
