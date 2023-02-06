import Jwt from "jsonwebtoken";

const token = (id:number, fullName:string, email:string, role:string) => {
    const token = Jwt.sign(
        {
            id: id,
            fullName: fullName,
            email: email,
            role: role,
        },
        `${process.env["TOKEN"]}`,
        { expiresIn: '14d' })

    return token
}

export default token;