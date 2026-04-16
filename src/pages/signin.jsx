import { useState } from "react"
import { useNavigate, Link, useOutletContext } from "react-router"
import { API_URL } from "../utils/api_url"

const SingIn = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setAuthUser } = useOutletContext()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch(`${API_URL}/api/auth/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                // handle bad request responses
                if (response.status == 400) {
                    const errResponse = await response.json()
                    throw new Error(errResponse.error)
                }

                throw new Error(`Http status ! ${response.status}`)
            }

            const result = await response.json()

            const accessToken = result.data.accessToken
            // store access token in sessionStorage
            sessionStorage.setItem('accessToken', accessToken)

            // get The auth user
            const responseAuthUser = await fetch(`${API_URL}/api/users/me`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })

            if (responseAuthUser.ok) {
                const resultAuthUser = await responseAuthUser.json()
                setAuthUser(resultAuthUser.data.user)
                navigate('/')
            }


        } catch (error) {
            setError(error.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="flex-1 flex justify-center mt-32 mb-14">
            <div className="flex flex-col items-center gap-4">
                <p className="text-2xl text-txtClr font-semibold">Login</p>
                <p>and participate in the <span className="text-primary">journey</span> with the <span className="text-primary">communty</span>!</p>
                <form
                    className="form"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <p>
                        <label htmlFor="username">
                            Username <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="border-transition"
                            id="username"
                            name="username"
                            type="email"
                            required
                        />
                    </p>

                    <p>
                        <label htmlFor="password">
                            Password <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="border-transition"
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            maxLength={16}
                        />
                    </p>

                    <button disabled={loading} className="submitBtn">
                        {loading ? 'Submiting...' : 'Login'}
                    </button>

                    {error && <p className="text-sm text-red-500"> {error}</p>}

                    <div className="self-center mt-auto mb-1">
                        Don't have an account yet?
                        <Link to={'/signup'}> <span className="text-primary">Sign up!</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingIn;