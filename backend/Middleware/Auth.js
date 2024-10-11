import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
  }

  try {
    const token = authorization.split(' ')[1]; // Extract the token from the "Bearer" token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // Set the user ID in the request for further use
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
  }
};

export default authUser;
