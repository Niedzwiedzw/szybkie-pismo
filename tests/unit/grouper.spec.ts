import {getPrefix} from "@/display-helpers";

describe('Grouping works', () => {
  it('prefix is selected properly', () => {
    expect(getPrefix('dupa_wolowa')).toBeNull();
    expect(getPrefix('dupa__wolowa')).not.toBeNull();
  })
});
