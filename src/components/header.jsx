import { Link } from 'react-router'
import { Newspaper } from "lucide-react"

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <Newspaper size={40} />
            <h2 className="text-2xl font-bold tracking-wide">
                Blog<span className="text-primary">TOP</span>
            </h2>
        </div>
    )
}

const Btns = () => {
    return (
        <div className="flex items-center gap-8 text-lg">
            <Link to={'/'} className='linkBtn'>Home</Link>
            <Link to={'/about'} className='linkBtn'>About me</Link>
            <Link to={'/signin'} className='linkBtn'>Login</Link>
            <Link to={'/signup'}
                className='bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease'>
                Sign up
            </Link>
        </div>
    )
}

const Header = () => {
    return (
        <div className="h-16 flex justify-around items-center border-b border-brdClr">
            <Logo />
            <Btns />
        </div>
    )
}

export default Header;