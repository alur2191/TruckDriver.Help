import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'
import { verifyPassword } from '../../../lib/auth';

async function handler(req, res) {

    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated!' });
        return;
    }

    const userEmail = session.user.email;
    const userPassword = req.body.password;


    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })

    if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
    }

    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(userPassword, currentPassword);

    if (!passwordsAreEqual) {
        res.status(403).json({ message: 'Invalid password.' });
        return;
    }

    const result = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            email: req.body.email
        }
    })

    res.status(200).json({ message: 'Email updated!' });
}

export default handler;