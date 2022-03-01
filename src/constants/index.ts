export = {
  ROUTER_PATH: {
    INDEX: '/',
    API_BASE_PATH: '/api',
    USER_PATH: '/users',
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
      USERS: {
        URL: '/users',
        SELECT: 'displayName,mail,userPrincipalName,id'
      },
      EMAIL: {
        URL: '/me/sendMail'
      },
    }
  },
};
