import jwt from 'jsonwebtoken';

function Auth(request, response, next) {
  try {
    const { authorization } = request.header;

    if (!authorization)
      return response.status(401).json({ message: 'missing token param' });

    const fragmentedToken = authorization.split(' ');

    if (fragmentedToken.length !== 2)
      return response.status(403).json({ message: 'Poorly structured token' });

    const [Bearer, token] = fragmentedToken;

    if (!/^Bearer$/i.test(Bearer))
      return response.status(403).json({ message: 'Poorly structured token' });

    jwt.verify(token, process.env.TOKEN_ENCRYPT, (error, decod) => {
      if (error) return response.statu(401).json({ message: 'Invalid token' });
      request.userId = decod.id;
      return next();
    });
  } catch ({ message }) {
    return response.status(404).json({ message });
  }
}

export default Auth;
