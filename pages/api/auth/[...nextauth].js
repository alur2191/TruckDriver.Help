

import prisma from '../../../lib/prisma'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth';




const createOptions = (req) => ({
    session:{
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    include:{
                        company:true
                    }
                })

                if (!user) {
                    throw new Error('Email is invalid!')
                }
                const isValid = await verifyPassword(credentials.password, user.password)

                if (!isValid) {
                    throw new Error('Could not log you in')
                }
                console.log('authuser: ',user);
                
                return user.company ? {
                    email: user.email,
                    activated: user.activated,
                    companyId: user.company.id
                } : {
                    email: user.email,
                    activated: user.activated
                }
            }
        })
    ],callbacks: {
        jwt: async (token, user) => {
            
            if(user){
                token.activated = user.activated
                if(user.companyId){
                    token.companyId = user.companyId
                }
            }
            
            return token;
        },
        session: async (session, user) => {
            if(user){
                session.user.companyId = user.companyId
                
                if(session.user.activated){
                    session.user.activated = user.activated
                }
                console.log(session);
            }

            return session;
        }
    },
})

export default async (req, res) => {
    return NextAuth(req, res, createOptions(req));
};