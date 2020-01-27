// @ts-ignore
import demo from '!!raw-loader!./data/documents/demo.durlex';
// @ts-ignore
import Wniosek_o_nadanie_klauzuli_wykonalnosci from '!!raw-loader!./data/documents/wniosek-klauzulowy.durlex';
// @ts-ignore
import Wniosek_o_nadanie_klauzuli_wykonalnosci_better from '!!raw-loader!./data/documents/wniosek-klauzulowy-better.durlex';

const demoCode = require('!!raw-loader!./data/documents/demo.durlex');
export const SUPPORTED_DOCUMENTS: {[key: string]: string} = {
  'Wniosek o nadanie klauzuli wykonalności': Wniosek_o_nadanie_klauzuli_wykonalnosci,
  'Wniosek o nadanie klauzuli wykonalności z ulepszoną składnią': Wniosek_o_nadanie_klauzuli_wykonalnosci_better,
  'Demo języka': demo,
};
