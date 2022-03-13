import classes from './footer.module.css'
import Link from 'next/link'

function Navbar() {

    return (
        <footer className={classes.footer}>
            <span>© {new Date().getFullYear()} TruckDriver.help</span>
            <ul>
                <li>
                    <Link href="https://docs.truckdriver.help">
                        <a><i className="bi bi-question-circle-fill"></i>Помощь</a>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}


export default Navbar;