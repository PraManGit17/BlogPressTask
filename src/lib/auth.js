// import jwt from 'jsonwebtoken';

// export const generateToken = (id) => {


//   const JWT_SECRET="myJWTsecret123";
//   return jwt.sign({ id }, JWT_SECRET, {
//     expiresIn: '7d',
//   });
// };

// export const verifyToken = (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };


import jwt from 'jsonwebtoken';

export const generateToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


