import { Fragment, useContext } from 'react';
import JobContext from "../../store/job-context";
import Router from "next/router";

function JobListing({ path, companyId }) {
    const jobCtx = useContext(JobContext);
    const {
        job: {
            type,
            pay,
            driverGross,
            ownerGross,
            teamPay,
            teamDriverGross,
            teamOwnerGross,
            id
        },
        driver,
        owner,
        setWarning
    } = jobCtx;


    const submitData = async (e) => {
        e.preventDefault()
        if (!type) {
            setWarning({ type: 'error', message: "Необходимо выбрать тип работы.", highlight: 'truck' })
            return
        } else {
            if (!driver && !owner) {
                setWarning({ type: 'error', message: "Необходимо выбрать тип водителя.", highlight: 'boxes' })
                return;
            } else {
                if (!pay && !driverGross && !ownerGross) {
                    console.log("pay err");
                    setWarning({ type: 'error', message: 'Необходимо указать минимум один метод оплаты.', highlight: 'inputs' })
                    return;
                }
            }
        }
        try {
            let body = {
                type,
                pay,
                driverGross,
                ownerGross,
                teamPay,
                teamDriverGross,
                teamOwnerGross,
            };
            id ? body = { ...body, id } : body = { ...body, companyId }
            await fetch(`/api/jobs/${path}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            await Router.push(id ? `/jobs/${id}` : `/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type='submit' value='Разместить' onClick={submitData} />
        </div>
    )
}

export default JobListing;