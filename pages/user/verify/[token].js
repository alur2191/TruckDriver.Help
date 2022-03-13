import AuthForm from "../../../components/auth/auth-form";
import classes from './verify.module.css'

function Verify({ token }) {
    return (
        <div className={classes.main}>
            <AuthForm token={token} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { token } = context.params;
    return {
        props: {
            token
        }
    }
}

export default Verify;
