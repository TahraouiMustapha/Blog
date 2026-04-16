import { useState, useEffect } from "react"
import { API_URL } from "../utils/api_url"

const useGetPostWithComments = ({ postId }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [postWithComments, setPostWithComments] = useState(null)

    useEffect(() => {
        if (!postId) return;

        const controller = new AbortController()
        const signal = controller.signal

        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_URL}/api/posts/${postId}`, signal)
                if (response.status >= 400) {
                    throw new Error('Server error')
                }

                const result = await response.json()
                const { comments, ...post } = result.data.post

                setPostWithComments({ post, comments })

            } catch (err) {
                setError(err)
                console.log('There was an error: ', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()

        return () => controller.abort();
    }, [postId])

    return { postWithComments, setPostWithComments, loading, error }
}

export default useGetPostWithComments