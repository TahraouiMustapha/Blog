import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import refreshAccessToken from '../utils/auth'

import { Logo } from './Logo'
import PrimaryBtn from './primaryBtn'
import LinkBtn from './linkBtn'
import DropDownMenu from './DropDownMenu'
import { Menu } from "lucide-react"

import HeaderInfoContext from "../context/headerInfoContext"


const Btns = ({ handleLogout }) => {
    const { authUser } = useContext(HeaderInfoContext)

    return (
        <div className="flex items-center gap-8 text-lg">
            <LinkBtn to={'/'}>Home</LinkBtn>
            <LinkBtn to={'/about'}>About me</LinkBtn>
            {
                authUser
                    ? <p className="text-gray-500 text-xl max-w-60 overflow-hidden whitespace-nowrap text-ellipsis">{authUser.username}</p>
                    : <LinkBtn to={'/signin'}>Login</LinkBtn>
            }
            {
                authUser
                    ? <button
                        onClick={handleLogout}
                        className="bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer"
                    >
                        Log out
                    </button>
                    : <PrimaryBtn to={'/signup'}>Sign Up</PrimaryBtn>
            }


        </div>
    )
}

const HamburgerMenu = ({ handleLogout, isOpen, setIsOpen }) => {
    const myPath = useRef()
    const location = useLocation()

    const handleClick = () => {
        setIsOpen(state => !state)
    }


    useEffect(() => {
        if (myPath.current === undefined) {
            myPath.current = location.pathname
            return
        }

        if (myPath.current !== location.pathname) {
            myPath.current = location.pathname
            setIsOpen(state => !state)
        }

    }, [location.pathname])

    return (
        <div>
            <Menu
                className="stroke-3"
                onClick={handleClick}
            />
            {isOpen && <DropDownMenu handleClick={handleClick} handleLogout={handleLogout} />}
        </div>
    )
}

const Header = () => {
    const { setAuthUser } = useContext(HeaderInfoContext)
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(
        window.matchMedia("(max-width: 768px)").matches
    )
    // to handle the menu open
    const [isOpen, setIsOpen] = useState(false)


    const handleLogout = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken')

            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include' // to send cookies
            })

            if (!response.ok) {
                if (response.status === 401) {
                    // Unauthorized (or token expired)
                    // this func return the accessToken or false if refreshToken is invalid
                    const refreshResult = await refreshAccessToken()
                    if (!refreshResult) {
                        // re-login 
                        sessionStorage.removeItem('accessToken')
                        setAuthUser(null)
                        navigate('/signin')
                        return;
                    }

                    // store access token in sessionStorage
                    sessionStorage.setItem('accessToken', refreshResult)
                    handleLogout()
                }
            } else {
                // delete access token 
                sessionStorage.removeItem('accessToken')
                setAuthUser(null)
                setIsOpen(false)
                console.log('logout successfuly')
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)")

        const handleChange = (e) => {
            setIsMobile(e.matches)
        }

        media.addEventListener('change', handleChange)

        return () => media.removeEventListener('change', handleChange)

    }, [])

    return (
        <div className="bg-white h-18 flex justify-around items-center border-b border-brdClr sticky top-0 z-10">
            <Logo />
            {
                isMobile
                    ? <HamburgerMenu handleLogout={handleLogout} isOpen={isOpen} setIsOpen={setIsOpen} />
                    : <Btns handleLogout={handleLogout} />
            }
        </div>
    )
}

export default Header;