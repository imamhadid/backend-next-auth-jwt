import type { NextApiRequest, NextApiResponse } from 'next';
import {
    loginPost
} from '@/controller/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST'){
        return res.status(405).send({
            status: `fail`,
            message: `Method Not Allowed`
        });
    } else {
        return await loginPost(req, res)
    }
}
