import Jwt from "jsonwebtoken";

const handle = (token:string) => {
    const auth = Jwt.verify(token, `${process.env["TOKEN"]}`)
    return auth
}

export default handle;