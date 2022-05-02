import { signOut, useSession } from "next-auth/react"
import PasswordForm from './password-form';
import EmailForm from './email-form';
import classes from './profile.module.css';


function ProfilePassword() {
    const [session, loading] = useSession()

    async function changePasswordHandler(passwordData) {
        const response = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
    }

    async function changeEmailHandler(emailData) {
        const response = await fetch('/api/user/change-email', {
            method: 'PATCH',
            body: JSON.stringify(emailData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json().then(() => response.status === 200 && signOut())
    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <section className={classes.profile}>
            <h3>Изменить Пароль</h3>
            <PasswordForm onChangePassword={changePasswordHandler} />
            <h3>Изменить Email</h3>
            <EmailForm onChangeEmail={changeEmailHandler} />
        </section>
    );
}

export default ProfilePassword;