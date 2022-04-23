import sendgrid from "@sendgrid/mail";


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    const { name, email, category, message } = req.body

    try {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

        await sendgrid.send({
            // to: email,
            to: "contact@truckdriver.help",
            from: "noreply@truckdriver.help",
            subject: `Обратная связь: ${category}. От: ${name}`,
            html: `<div>
            <div>Имя:${name}</div>
            <div>Почта:${email}</div>
            <div>Причина:${category}</div>
            <div>Сообщение:${message}</div>
            </div>`,
        });
        res.status(201).end();
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}