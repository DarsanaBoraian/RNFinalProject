import {I18n} from 'i18n-js';
import en from '../translations/en.json';
import ur from '../translations/ur.json';
import fr from '../translations/fr.json';
const i18n = new I18n({
  ...en,
  ...ur,
  ...fr,
});
i18n.locale = 'fr';
export default i18n;
