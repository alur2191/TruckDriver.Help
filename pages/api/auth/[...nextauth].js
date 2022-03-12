import prisma from '../../../lib/prisma'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth';
import jwt from 'jsonwebtoken';

const createOptions = (req) => ({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    include: {
                        company: true
                    }
                })

                if (!user) {
                    throw new Error('Email не существует')
                }

                const isValid = await verifyPassword(credentials.password, user.password)
                if (!isValid) {
                    throw new Error('Не удалось войти')
                } else if (!user.activated) {
                    const emailTokenValid = await new Promise((resolve) => {
                        jwt.verify(credentials.token, process.env.SECRET + credentials.email, (err) => {
                            if (err) resolve(false)
                            if (!err) resolve(true)
                        })
                    })
                    if (emailTokenValid) {
                        try {
                            await prisma.user.update({
                                where: {
                                    email: credentials.email
                                },
                                data: {
                                    activated: true
                                }
                            })

                        } catch (err) {
                            console.log("Unable to update activation");
                        }

                        try {
                            const user = await prisma.user.findUnique({
                                where: {
                                    email: credentials.email
                                }
                            })
                            return {
                                email: user.email,
                                activated: user.activated,
                                id: user.id
                            }
                        } catch (err) {

                            console.log("Unable to fetch user");
                        }

                    } else {
                        throw new Error("Необходимо верифицировать аккаунт")
                    }

                }

                return user.company ? {
                    email: user.email,
                    activated: user.activated,
                    companyId: user.company.id,
                    id: user.id
                } : {
                    email: user.email,
                    activated: user.activated,
                    id: user.id,
                }
            }
        })
    ], callbacks: {
        jwt: async (token, user) => {
            if (req.url === "/api/auth/session?update") {
                const userRes = await prisma.user.findUnique({
                    where: {
                        email: token.email
                    },
                    include: {
                        company: true
                    }
                })
                userRes.company && (token.companyId = userRes.company.id)
            }
            if (user) {
                token.activated = user.activated
                token.id = user.id
                if (user.companyId) {
                    token.companyId = user.companyId
                }
            }

            return token;
        },
        session: async (session, user) => {
            if (user) {
                session.user.companyId = user.companyId
                session.user.id = user.id
                if (session.user.activated) {
                    session.user.activated = user.activated
                }
            }

            return session;
        }
    },
})

export default async (req, res) => {
    return NextAuth(req, res, createOptions(req));
};