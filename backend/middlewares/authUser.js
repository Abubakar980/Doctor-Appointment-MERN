import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: 'Not authorized. Login again.' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Optional admin check — uncomment only if you need admin only access
        // if (token_decode.email !== process.env.ADMIN_EMAIL) {
        //     return res.json({ success: false, message: 'Not authorized. Login again.' });
        // }

        req.user = { id: token_decode.id }; // ✅ Attach userId here
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
