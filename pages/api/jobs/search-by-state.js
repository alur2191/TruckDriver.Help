import prisma from '../../../lib/prisma'

async function handler(req, res) {
    console.log('1!!!!!!!!!!!!!!!!!!!1111',req.body.state);
    try {
        const prisma = new PrismaClient();
        
        const jobs = await prisma.job.findMany({
            where :{
                company: {
                    state:req.body.state
                }
            },
            include:{
                company: true
            }
        })
        res.status(200)
        res.json({jobs})
    } catch (e) {
        res.status(500)
        res.json({error: "Ошибка при запросе спика работ."})
    } finally {
        await prisma.$disconnect()
    }

}

export default handler