import { useState } from "react"
import { useNavigate } from "react-router"

const SingIn = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch('http://localhost:3000/api/auth/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                // credentials: 'include' // receiving/sending cookies
            })

            if (!response.ok) {
                throw new Error(`Http status ! ${response.status}`)
            }

            const result = await response.json()

            // store access token in sessionStorage
            console.log(result.data.accessToken)
            sessionStorage.setItem('accessToken', result.data.accessToken)

            navigate('/')

        } catch (error) {
            setError(error.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <input
                    name="username"
                    type="email"
                    required
                />

                <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    maxLength={16}
                />

                {error && <p> {error}</p>}

                <button disabled={loading}>
                    {loading ? 'Submitting...' : 'Login'}
                </button>
            </form>
        </>
    )
}

export default SingIn;