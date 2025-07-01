import jwt from 'jsonwebtoken';

export const getTokenData = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; 
  } catch (err) {
    throw new Error('Invalid token');
  }
};
