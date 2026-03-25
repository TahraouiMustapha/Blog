import { X, House, Info, LogIn } from "lucide-react"
import { Logo } from "./Logo"
import LinkBtn from "./linkBtn"
import PrimaryBtn from "./primaryBtn"

const DropDownMenu = ({ handleClick }) => {
    return (
        <div className="bg-gray-500 absolute h-screen w-screen inset-0 flex animate-open-overlay">
            {/* backdrop */}
            <div
                onClick={handleClick}
                className="flex-1 relative" >
                <X className="stroke-white stroke-2 absolute top-1 right-2" />
            </div>
            {/* menu */}
            <div className="bg-white h-full w-[45%] animate-open-menu flex flex-col p-4 gap-8">
                <div>
                    <Logo />
                </div>

                <div className="grid h-[33%] auto-rows-fr btnsMenu ">
                    <div>
                        <House />
                        <LinkBtn to={'/'}>Home</LinkBtn>
                    </div>
                    <div>
                        <Info />
                        <LinkBtn to={'/about'}>About me</LinkBtn>
                    </div>
                    <div>
                        <LogIn />
                        <LinkBtn to={'/signin'}>Login</LinkBtn>
                    </div>
                    <div>
                        <PrimaryBtn to={'/signup'}>Sign Up</PrimaryBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropDownMenu