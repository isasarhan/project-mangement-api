import jwt from 'jsonwebtoken'

export const generateJwtToken = (id: string, email: string) => {
  const secretKey = process.env.JWT_SECRET || 'defaultsecretkey';

  const payload = { id, email };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
};