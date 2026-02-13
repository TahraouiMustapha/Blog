import { Newspaper } from "lucide-react"
import LogoName from './logoName'
import PrimaryBtn from './primaryBtn'
import LinkBtn from './linkBtn'
import { useNavigate } from "react-router"

import refreshAccessToken from '../utils/auth'

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

const Btns = ({ authUser, handleLogout }) => {

    return (
        <div className="flex items-center gap-8 text-lg">
            <LinkBtn to={'/'}>Home</LinkBtn>
            <LinkBtn to={'/about'}>About me</LinkBtn>
            {
                authUser
                    ? <p className="text-gray-500 text-xl">{authUser.username}</p>
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


const Header = ({ authUser, setAuthUser }) => {
    const navigate = useNavigate()

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
                console.log('logout successfuly')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="bg-white h-18 flex justify-around items-center border-b border-brdClr sticky top-0 z-10">
            <Logo />
            <Btns authUser={authUser} handleLogout={handleLogout} />
        </div>
    )
}

export default Header;