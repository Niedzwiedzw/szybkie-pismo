// @ts-ignore
import demo from '!!raw-loader!./data/documents/demo.durlex';
// @ts-ignore
import Wniosek_o_nadanie_klauzuli_wykonalnosci from '!!raw-loader!./data/documents/wniosek-klauzulowy.durlex';

const demoCode = require('!!raw-loader!./data/documents/demo.durlex');
export const SUPPORTED_DOCUMENTS: {[key: string]: string} = {
  'Wniosek o nadanie klauzuli wykonalności': Wniosek_o_nadanie_klauzuli_wykonalnosci,
  'Demo języka': demo,
};
