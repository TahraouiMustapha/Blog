import { createContext } from "react"

export default createContext({
    authUser: null,
    setAuthUser: () => { },
})