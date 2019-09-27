export const environment = {
  production: true,
  apiUrl: 'https://crearestudio-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('gerenciador-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('/\/oauth\/token/') ]
};
