import bcrypt from "bcrypt";

const password = "password123";
const saltRounds = 10;

const hashPassword = async () => {
    const hashed = await bcrypt.hash(password, saltRounds);
    console.log("New Hashed Password:", hashed);
};

hashPassword();
