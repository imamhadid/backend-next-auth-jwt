import prisma from '@/util/database/config';
import bcrypt from "bcrypt";
import token from '@/util/middleware/getToken';
let hashNumb: number = 10;

const loginPost = async (
    req: any,
    res: any
) => {
    await prisma.users.findFirst({
        where: {
            email: req.body.email,
        },
        select: {
            id:true,
            email: true,
            password: true,
            role: true,
            fullName: true
        }
    }).then(userData => {
        if (userData === null) {
            return res.status(404).send({
                status: "fail",
                message: "email atau password salah"
            })
        } else {
            const password: string = userData.password !== null ? userData.password : '';
            return bcrypt.compare(req.body.password, password).then(function (result) {

                if (result === true) return res.status(200).send({
                    status: `success`,
                    data:{
                        role:userData.role,
                        token: token(userData.id, userData.fullName, userData.email, userData.role)
                    }
                })

                return res.status(404).send({
                    status: "fail",
                    message: "email atau password salah"
                })
            });

        }
    }).catch(error => {
        return res.status(409).send({
            status: `fail`,
            message: error
        });
    });
}

const registerPost = async (
    req: any,
    res: any
) => {
    return await prisma.users.findFirst({
        where: {
            email: req.body.email,
        },
    }).then(userData => {
        if (userData !== null) {
            return res.status(404).send({
                status: "fail",
                message: "email telah terdaftar"
            })
        }
        return bcrypt.hash(req.body.password, hashNumb).then(async function (hash) {
            return await prisma.users.create({
                data: {
                    email: req.body.email,
                    password: hash,
                    numberPhone: req.body.numberPhone,
                    fullName: req.body.fullName,
                    role: `user`
                },
                select: {
                    fullName: true,
                    createdAt: true
                }
            }).then(successCreate => {
                return res.status(200).send({
                    status: `success`,
                    message: successCreate
                })
            }).catch(error => {
                return res.status(409).send({
                    status: `fail`,
                    message: error
                });
            });
        });
    }).catch(error => {
        return res.status(409).send({
            status: `fail`,
            message: error
        });
    });
}


export {
    loginPost,
    registerPost
}