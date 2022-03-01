import Link from "next/link"

function NotFoundPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h1>Страница не найдена!</h1>
            <Link href={{ pathname: `/` }}>
                <a>
                    Вернуться на главную страницу.
                </a>
            </Link>
        </div>
    )
}

export default NotFoundPage