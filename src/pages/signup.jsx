import { useState } from "react";

const SingUp = () => {
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
                throw new Error(`Http error! status: ${await response.status}`)
            }

            const result = await response.json()
            console.log(result)

        } catch (error) {
            setError(error.message)
            console.error(error)
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
                    {loading ? 'Submiting...' : 'Submit'}
                </button>
            </form>
        </>
    )
}

export default SingUp;