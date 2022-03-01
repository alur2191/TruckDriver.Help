

import prisma from '../../../lib/prisma'

export default async function (req, res) {
    try {
        try {

            const notifications = await prisma.notification.findMany({
                where: {
                    user_id: req.body.id
                }
            })
            console.log(notifications);
            res.status(200)
            res.json({ notifications })
        } catch (err) {
            console.log('fail: ', err);
        }
    } catch (e) {
        res.status(500);
        res.json({ error: 'Ошибка при сохранении поста.' })
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}