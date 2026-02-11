import { useOutletContext, useParams } from "react-router"
import useGetPostWithComments from "../hooks/useGetPostWithComments"

const PostPage = () => {
    const { id } = useParams()
    const { authUser } = useOutletContext()
    const { postWithComments, loading, error } = useGetPostWithComments({ postId: id })


    return (
        <>
            <h3>hi {id}</h3>
        </>
    )
}

export default PostPage