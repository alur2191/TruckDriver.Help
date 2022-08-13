# TruckDriver.help

[View live](https://www.truckdriver.help)

Platform for immigrants from CIS countries employed as professional drivers and carrier companies operating in the freight transportation logistics industry. 
Features:

- Drivers can register an account (email sent via SendGrid)
- Drivers can register a carrier company
- Carriers can add trucks and trailers to their fleet
- Carriers can create job postings (Telegram bot posts a copy of the new job on the platform Telegram channel)
- Carriers can remove job postings/fleet list
- Carriers can edit job postings/fleet list
- Driver can report job postings

[Second repo](https://github.com/dandavisjs/TDL-Academy)

[View live](https://academy.truckdriver.help)

- Driver preparation quiz with interactive translator. 
- Lightweight videos course player.

# Process

**Stack:** Next.JS, Prisma 2 + PostgreSQL.

Platform was developed utilizing Server-Side rendering and Static Site Generation capabilities of Next.js. PostgreSQL hosted on AWS RDS and manipulated by Prisma ORM.

Authentication process is handeled by next-auth, bcryptjs, jsonwebtoken, and sengrid for sending email verification.

**Dependencies:** Next-auth, JWT, bcryptjs, @sendgrid/mail, Bootstrap-icons, React-Google-Recaptcha, Telegraf

# Future Development

- Advanced search filters
- Multiple languages
- Notifications
- Remove job from list of saved jobs
- Refactor with TypeScript
- Refactor HTML, CSS

# Environment variables

**NEXTAUTH_URL** = URL to where the app is deployed

**DATABASE_URL** = URL to PSQL DB

**NEXT_PUBLIC_RECAPTCHA_SITE_KEY** = Recaptcha public site key here

**RECAPTCHA_SECRET** = Recaptcha secret key

**SENDGRID_API_KEY** = Sendgrid API key

**JWT_SECRET** = randomly generate secret key needed for JWT

**NEXT_PUBLIC_GOOGLE_ANALYTICS** = Google Analytics ID
