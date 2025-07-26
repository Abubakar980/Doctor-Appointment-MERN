import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.doctor = { id: token_decode.id }; // ✅ safer and correct

        console.log("Authenticated Doctor:", token_decode);


        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authDoctor;
