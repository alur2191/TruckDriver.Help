import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { about,additional,parking,id,filteredName }= req.body
    const characterUppercase = (stringToConvert) => {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);
    
        return firstCharacter.toUpperCase() + restString;
    }
    const uppercase = (stringToConvert) => {
        const wordsArray = stringToConvert.split(' ');
        const convertedWordsArray = wordsArray.map(word => {
            return characterUppercase(word);
        });
    
        return convertedWordsArray.join(' ');
    }
    try {

        const updateCompany = await prisma.company.update({
            where:{
                id
            },
            data:{
                ...about,
                name:uppercase(filteredName),
                ...additional,
                parking:parking
            }
        })
        res.status(201);
        res.json({updateCompany});
    } catch (e) {
        res.status(500);
        res.json({error:'Ошибка при создании компании.'})
        console.log(e)
    } finally {
        await prisma.$disconnect();
    }

}