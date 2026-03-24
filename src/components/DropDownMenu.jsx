import { X } from "lucide-react"

const DropDownMenu = ({ handleClick }) => {
    return (
        <div className="bg-gray-500 absolute h-screen w-screen inset-0 flex ">
            <div
                onClick={handleClick}
                className="flex-1 relative" >
                <X className="stroke-white stroke-2 absolute top-1 right-2" />
            </div>
            <div className="bg-white h-full w-[45%]">
                menu
            </div>
        </div>
    )
}

export default DropDownMenu;