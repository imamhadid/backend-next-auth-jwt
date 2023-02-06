import type { NextApiRequest, NextApiResponse } from 'next';
import {
    registerPost
} from '@/controller/auth';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({
            status: `fail`,
            message: `Method Not Allowed`
        });
    }
    return registerPost(req, res)
}
