import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    // ✅ Dito mo ilagay yung logs
    console.log("Email input:", email);
    console.log("Password input:", password);

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        console.log("User from DB:", user);

        if (!user) return res.status(401).json({ message: "Invalid credentials." });

        console.log("User hashed password:", user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Is password valid:", isPasswordValid);

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                department: user.department,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};

