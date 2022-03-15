import { PrismaClient } from "@prisma/client";
import classes from "./id.module.css"
import JobListing from "../../components/jobs/jobListing";
import Head from 'next/head'

function JobDetails({ job }) {
    // Reformating phone number field
    var formattedNumber = "(" + job.company.phone.slice(0, 3) + ") " + job.company.phone.slice(3, 6) + "-" + job.company.phone.slice(6, 10);

    return (
        <div className={classes.main}>
            <Head>
                <title>{job.company.name} - TruckDriver.help</title>
            </Head>
            <div className="bg-primary">
                <div className="listing">
                    <JobListing key={job.id} job={job} />
                </div>
                <div>
                    <div><strong>Телефон: </strong>{formattedNumber}</div>
                    {job.company.website && <div><strong>Сайт: </strong><span style={{ cursor: 'pointer' }} onClick={() => { window.open(`http://${job.company.website}`, '_blank').focus(); }}>{job.company.website}</span></div>}
                </div>
                <hr />
                <div>
                    <div >
                        <div>
                            <div>
                                <strong>24/7 Диспетчер: </strong>
                                <span>{job.company.dispatch24 ? 'Есть' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <strong>Депозит: </strong>
                                <span>{job.company.deposit ? '$' + job.company.deposit : 'Не нужен'}</span>
                            </div>
                            <div>
                                <strong>Мед. Страховка: </strong>
                                <span>{job.company.insurance ? 'Есть' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {job.company.parking.length > 0 && (
                                <div>
                                    <strong>Парковки (Штаты): </strong>
                                    {job.company.parking.map((parking, i) => {
                                        return <span key={i}>{parking}{job.company.parking.length === i + 1 ? '.' : ','} </span>
                                    })}
                                </div>)}
                        </div>
                    </div>
                </div>
                {/* Fields are visible if a company has trucks */}
                {job.company.trucks[0] && <hr />}
                {job.company.trucks[0] && <h4>Траки</h4>}
                {job.company.trucks[0] && job.company.trucks.map((truck, i) => {
                    return (
                        <div key={i} style={{ backgroundColor: i % 2 !== 0 ? "#f7f7fc" : null }} className={classes.fleet}>

                            <div>
                                <div><strong>Марка</strong></div>
                                <div><strong>Год</strong></div>
                                <div><strong>Аренда</strong></div>
                                <div><strong>Трансмиссия</strong></div>
                            </div>
                            <div>
                                <div>{truck.manufacturer}</div>
                                <div>{truck.year}</div>
                                <div>{truck.lease ? 'Есть' : 'Нет'}</div>
                                <div>{truck.transAuto && 'Автомат'}{truck.transAuto && truck.transMan && ' / '}{truck.transMan && 'Ручная'}</div>
                            </div>
                        </div>
                    )
                })}
                {/* Fields are visible if a company has trailers */}
                {job.company.trailers[0] && <hr />}
                {job.company.trailers[0] && <h4>Трейлеры</h4>}
                {job.company.trailers[0] && job.company.trailers.map((trailer, i) => {
                    return (
                        <div key={i} style={{ backgroundColor: i % 2 !== 0 ? "#f7f7fc" : null }} className={classes.trailer}>
                            <div>
                                <div><strong>Тип</strong></div>
                                <div><strong>Годы</strong></div>
                                <div><strong>Аренда</strong></div>

                            </div>
                            <div>
                                <div>{trailer.type}</div>
                                <div>{trailer.year}</div>
                                <div>{trailer.lease ? 'Есть' : 'Нет'}</div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const prisma = new PrismaClient();
    // Fetch a job post and include related items from Company table
    const job = await prisma.job.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            company: {
                include: {
                    trucks: true,
                    trailers: true
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
