const TEMPLATE_BEGIN = '{{';
const TEMPLATE_END = '}}';
const VARIABLE_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  `${TEMPLATE_BEGIN}\s?(.*)${TEMPLATE_END}`,
  'g'
);

export class Variable {
  public constructor(
    public position: [number, number],
    public varName: string
  ) {}
}

export class ConditionalBlock {
  constructor(public text: string, public start: [number, number]) {}
}

export function extractVariables(text: string) {}
