import { PrismaClient } from "@prisma/client";
import classes from "./id.module.css"
import JobListing from "../../components/jobs/jobListing";

function JobDetails(props) {
    const job = props.job

    console.log(job);
    return(
        <div className={classes.main}>
            <div className="bg-primary">
                <div className="listing">
                    <JobListing key={job.id} job={job} />
                </div>
                <div>
                    <div><strong>Телефон: </strong>{job.company.phone}</div>
                    <div><strong>Сайт: </strong><span style={{cursor:'pointer'}} onClick={()=>{window.open(`http://${job.company.website}`, '_blank').focus();}}>{job.company.website}</span></div>
                </div>
                <hr />
                <div>
                    <div >
                        <div>
                            <div>
                                <strong>24/7 Диспетчер: </strong>
                                <span>{job.company.dispatch24 ? 'Есть' : 'Нет'}</span>
                            </div>
                            <div>
                                <strong>Логбук: </strong>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <strong>Депозит: </strong>
                                <span>{job.company.deposit ? '$'+job.company.deposit:'Не нужен'}</span>
                            </div>
                            <div>
                                <strong>Мед. Страховка: </strong>
                                <span>{job.company.insurance ? 'Есть' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <strong>Парковки: </strong>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={classes.fleet}>
                    <h3>Траки</h3>
                    <div>
                        <div><strong>Марка</strong></div>
                        <div><strong>Годы</strong></div>
                        <div><strong>Аренда</strong></div>
                        <div><strong>Трансмиссия</strong></div>
                    </div>
                    <div>
                        <div>{job.company.trucks[0].manufacturer}</div>
                        <div>{job.company.trucks[0].year_from}-{job.company.trucks[0].year_to}</div>
                        <div>{job.company.trucks[0].lease ? 'Есть' : 'Нет'}</div>
                        <div>Автомат</div>
                    </div>
                </div>
                <hr />
                <div className={classes.trailer}>
                    <h3>Трейлеры</h3>
                    <div>
                        <div><strong>Тип</strong></div>
                        <div><strong>Годы</strong></div>
                        <div><strong>Аренда</strong></div>
                        
                    </div>
                    <div>
                            <div>{job.company.trailers[0].trailer_type[0]}</div>
                            <div>{job.company.trailers[0].year_from}-{job.company.trailers[0].year_to}</div>
                            <div>{job.company.trailers[0].lease ? 'Есть' : 'Нет'}</div>
                            
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export async function getStaticProps(context){
    const { id } = context.params;
    const prisma = new PrismaClient();
    const job = await prisma.job.findUnique({
        where :{
            id: parseInt(id)
        },
        include:{
            company: {
                include: {
                    trucks: true,
                    trailers:true
                }
            }
        }
    })
    const processedJob = JSON.parse(JSON.stringify(job))
    return {
        props:{
            job: processedJob
        }
    }
}

export async function getStaticPaths() {
    return {
        paths:[
            {params:{id:'1'}}
        ],
        fallback: 'blocking'
    }
}


export default JobDetails;
