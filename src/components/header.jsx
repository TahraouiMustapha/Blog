import { Newspaper } from "lucide-react"
import LogoName from './logoName'
import PrimaryBtn from './primaryBtn'
import LinkBtn from './linkBtn'

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <Newspaper size={40} />
            <h2 className="text-2xl font-bold tracking-wide">
                <LogoName />
            </h2>
        </div>
    )
}

const Btns = () => {
    return (
        <div className="flex items-center gap-8 text-lg">
            <LinkBtn to={'/'}>Home</LinkBtn>
            <LinkBtn to={'/about'}>About me</LinkBtn>
            <LinkBtn to={'/signin'}>Login</LinkBtn>
            <PrimaryBtn to={'/signup'}>Sign Up</PrimaryBtn>
        </div>
    )
}

const Header = () => {
    return (
        <div className="h-18 flex justify-around items-center border-b border-brdClr">
            <Logo />
            <Btns />
        </div>
    )
}

export default Header;