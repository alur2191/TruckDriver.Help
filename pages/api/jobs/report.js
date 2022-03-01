import sendgrid from "@sendgrid/mail";


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { reason, description, email, job, company } = req.body

    try {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

        await sendgrid.send({
            // to: email,
            to: "akmalu21@gmail.com",
            from: "noreply@truckdriver.help",
            subject: `Жалоба: ${company}`,
            html: `<div>
            <p>Жалоба на: ${company}.</p>
            <p>Пост ID: ${job}.</p>
            <p>От: ${email}.</p>
            <p>Причина: ${reason}.</p>
            <p>Подробности: ${description}.</p>
            </div>`,
        });
        res.status(201).end();
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}