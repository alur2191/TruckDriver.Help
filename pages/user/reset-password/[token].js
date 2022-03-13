import PasswordReset from "../../../components/auth/password-reset";
import { PrismaClient } from "@prisma/client";
import classes from './resetPassword.module.css'

function resetPassword({ token, user }) {
    return (
        <div className={classes.main}>
            <PasswordReset token={token} email={user ? user.email : null} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { token } = context.params;
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
            token
        },
        select: {
            email: true
        }
    })
    const processedUser = JSON.parse(JSON.stringify(user))
    return {
        props: {
            token,
            user: processedUser
        }
    }
}




export default resetPassword;
