import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma'
import { hashPassword, verifyPassword } from '../../../lib/auth';

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
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;


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
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordsAreEqual) {
        res.status(403).json({ message: 'Invalid password.' });
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            password: hashedPassword
        }
    })

    res.status(200).json({ message: 'Password updated!' });
}

export default handler;