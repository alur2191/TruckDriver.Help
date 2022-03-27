import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import classes from './auth.module.css'
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={classes.main}>
            <div>
                <AuthForm />
            </div>
        </div>
    )
}

export default AuthPage;