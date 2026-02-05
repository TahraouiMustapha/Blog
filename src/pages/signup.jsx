import { useState } from "react";
import { Link, useNavigate } from 'react-router'

const SingUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const form = new FormData(e.target)
        const data = Object.fromEntries(form)

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                // handle conflict unique constrains (email)
                if (response.status == 409) {
                    const result = await response.json()
                    throw new Error(result.data.error)
                }
                throw new Error(`Http error! status: ${response.status}`)
            }

            // success register
            navigate('/')

        } catch (error) {
            setError(error.message)
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="flex-1 flex justify-center mt-32 mb-14">
            <div className="flex flex-col items-center gap-4">
                <p className="text-2xl text-txtClr font-semibold">Sign up</p>
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
                        {loading ? 'Submiting...' : 'Register'}
                    </button>

                    {error && <p className="text-sm text-red-500"> {error}</p>}

                    <div className="self-center mt-auto mb-1">
                        Already have an account?
                        <Link to={'/signin'}> <span className="text-primary">Sign in!</span></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingUp;