import { PrismaClient } from "@prisma/client";
import { useRef, useState } from "react";
import { useSession } from 'next-auth/client';
import classes from './id.module.css'
import Head from 'next/head'

function JobDetails({ job }) {
    const reasonRef = useRef()
    const descriptionRef = useRef()
    const [message, setMessage] = useState({ status: '', message: '' })
    const [session] = useSession()

    const sendReport = async (e) => {
        e.preventDefault()
        const reason = reasonRef.current.value
        const description = descriptionRef.current.value
        // Check if description field is empty
        !descriptionRef && setMessage({ status: 'error', message: 'Введите подробносоти о вашей жалобе.' })
        try {
            let body = {
                reason,
                description,
                email: session.user.email,
                job: job.id,
                company: job.company.name
            };
            const report = await fetch(`/api/jobs/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (report.ok) {
                setMessage({ status: 'success', message: 'Жалоба отправлена.' })
                descriptionRef.current.value = ''
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={classes.main}>
            <Head>
                <title>Пожаловаться На Пост</title>
            </Head>
            <form onSubmit={sendReport}>

                <h3>Пожаловаться На Пост</h3>
                <p>Пожалуйтса подробнее опишите причину жалобы на пост компании <em>{'"'}{job.company.name}{'"'}</em>.</p>
                <div className='form-column'>
                    <label htmlFor='reason'>
                        <span className='required'>*</span>Причина:
                    </label>
                    <select
                        name='reason'
                        id='reason'
                        ref={reasonRef}
                        required
                        style={{ width: 180 }}
                    >
                        <option value='Спам'>Спам</option>
                        <option value='Ложная Информация'>Ложная Информация</option>
                        <option value='Другая'>Другая</option>
                    </select>
                </div>
                <div className='form-column'>
                    <label htmlFor='city'>
                        <span className='required'>*</span>Коментарии:
                    </label>
                    <textarea
                        style={{ height: 80 }}
                        className='input-md'
                        ref={descriptionRef}
                        name='description'
                        id='description'
                        required
                    />
                </div>
                {message.message && <span style={message.status ? { color: 'green' } : { color: 'red' }}>{message.message}</span>}
                <button type="submit">Отправить</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const prisma = new PrismaClient();
    // Find a job by ID that was indicated through params. Include only ID, and company name (related schema)
    const job = await prisma.job.findUnique({
        where: {
            id: parseInt(id)
        },
        select: {
            id: true,
            company: {
                select: {
                    name: true
                }
            }
        }
    })
    const processedJob = JSON.parse(JSON.stringify(job))
    return {
        props: {
            job: processedJob
        }
    }
}



export default JobDetails;
