import {I18n} from 'i18n-js';
import en from '../translations/en.json';
import ur from '../translations/ur.json';
import fr from '../translations/fr.json';

/**
 * yarn add i18n-js@latest
 */
const i18n = new I18n({
  ...en,
  ...ur,
  ...fr,
});
i18n.locale = 'en';
export default i18n;
