export = {
  ROUTER_PATH: {
    INDEX: '/',
    LOGIN_PATH: '/login',
    AUTH_PATH: '/auth',
    SIGN_IN_PATH: '/signin',
    CALL_BACK_PATH: '/callback',
    SIGN_OUT_PATH: '/signout',
    USER_PATH: '/users',
    API_BASE_PATH: '/api',
    ID_PARAMS: '/:id',
  },
  EXPRESS_SESSION: {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy'
  },
  MICROSOFT_GRAPH_CLIENT: {
    API: {
      ME: {
        URL: '/me',
        SELECT: 'displayName,mail,userPrincipalName'
      },
      ME_PHOTO_VALUE: {
        URL: '/me/photo/$value',
      },
    }
  },
};
