export function expressJwtErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    if (!req.headers['authorization'] || req.headers['authorization'] === '') {
      res.status(401).json({error: 'No authorization token found'});
    } else {
      res.status(401).json({error: 'Invalid authorization token'});
    }
  }
}

export function expressJwtConfig(secret) {
  console.log(secret);
  return {
    secret: secret,
    credentialsRequired: false,
    getToken: function(req){
      if(req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        let token;
        if (parts.length == 2) {
          const scheme = parts[0];
          const credentials = parts[1];
  
          if (/^Bearer$/i.test(scheme)) {
            token = credentials;
          } else {
            if (this.credentialsRequired) {
              throw new expressJwt.UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' });
            }
          }
        } else {
          throw new expressJwt.UnauthorizedError('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' });
        }
  
        return token;
      } else if(req.cookies && req.cookies.sessToken) {
        return req.cookies.sessToken;
      }
    }
  }
}