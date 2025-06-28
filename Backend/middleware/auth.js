import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authUser

// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.json({ success: false, message: 'Not Authorized. Login again.' });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id; // or use req.userId = ...
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: 'Invalid or expired token.' });
//   }
// };

// export default authUser;
