import { useState, useEffect } from "react";

const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch('/api/posts', { signal: signal })
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(resObj => {
                const receivedPosts = resObj.data.posts;
                setPosts(receivedPosts)
            })
            .catch(error => {
                if (error.name !== 'AbortError') setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

        return () => controller.abort();
    }, [])

    return { posts, error, loading }
}

export default useGetPosts

