import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "no Token" });
  }

  const token1 = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token1, "secret");

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "User no authenticated" });
    }

    //Assig user to req.user
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
