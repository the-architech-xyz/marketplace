import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  const supportedLocales = <%= JSON.stringify(module.parameters.locales) %>;
  const defaultLocale = '<%= module.parameters.defaultLocale %>';
  
  if (!locale || !supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
