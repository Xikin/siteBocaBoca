// Componente responsavel por fazer a verificação da forma que o usuario usou para Logar
// As possibilidades sao: Google Login  e Normal Login

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const googleToken = token.length > 1000;
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
        role:'basic'
      };
    } else {
      //Verficamos e extraimos as informações do usuário pelo token no servidor.
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id, name, photoURL ,role} = decodedToken;
      req.user = { id, name, photoURL ,role};
    }
    next();6
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Algo está errado com a sua autenticação!',
    });
  }
};

export default auth;