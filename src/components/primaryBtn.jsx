import { Link } from "react-router";

const PrimaryBtn = ({ to, children }) => {
    return (
        <Link to={to}
            className='bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease'>
            {children}
        </Link>
    )
}

export default PrimaryBtn;