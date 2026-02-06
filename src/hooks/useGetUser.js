import { useState, useEffect } from "react"


const useGetUser = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        // to cancel requests when App unmounts 
        const controller = new AbortController()


        const fetchUser = async () => {
            try {
                const accessToken = sessionStorage.getItem('accessToken')
                const signal = controller.signal

                const response = await fetch('http://localhost:3000/api/users/me', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    signal
                })

                if (response.ok) {
                    const result = await response.json()
                    setAuthUser(result.data.user)
                }

            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('err:', err)
                }
            }

        }

        fetchUser()

        return () => controller.abort()

    }, [])

    return { authUser, setAuthUser }
}

export default useGetUser