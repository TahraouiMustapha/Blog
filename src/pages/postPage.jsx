import { useOutletContext, useParams } from "react-router"
import useGetPostWithComments from "../hooks/useGetPostWithComments"
import { useState } from "react"

const Comment = ({ comment }) => {
    return (
        <div className="border border-brdClr rounded-md p-3">
            <div className="flex items-center gap-5 mb-2">
                <p className="text-primary text-lg">{comment.username}</p>
                <p className="dateTag">{comment.date}</p>
            </div>

            <div>
                {comment.text}
            </div>
        </div>
    )
}

const LeaveComment = ({ postId, setPostWithComments }) => {
    const [comment, setComment] = useState('')

    const handleCommentCreation = async () => {
        try {
            if (comment.trim()) {
                const token = sessionStorage.getItem('accessToken')
                const data = {
                    text: comment
                }

                const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (response.status >= 400) {
                    throw new Error("Server error")
                }

                // success 
                const result = await response.json()
                const newComment = result.data.comment

                setPostWithComments(prev => ({ ...prev, comments: [...prev.comments, newComment] }))
                setComment('')
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <textarea
                value={comment}
                className="border border-red-500"
                onChange={(e) => setComment(e.target.value)}
                name="text" id="com" />

            <button
                onClick={handleCommentCreation}>
                Comment
            </button>
        </div>
    )
}

const PostPage = () => {
    const { id } = useParams()
    const { authUser } = useOutletContext()
    const { postWithComments, setPostWithComments, loading, error } = useGetPostWithComments({ postId: id })

    const { post = null, comments = null } = postWithComments || {}

    if (loading) return <p className="text-center">...Loading</p>
    if (error) return <p>A network error was encountered</p>

    return (
        <div className="flex-1 flex flex-col bigDiv">
            <div
                className="h-76 rounded-b-xl"
                style={{ backgroundImage: post?.thumbnailUrl ? `url(${post.thumbnailUrl})` : 'none' }}>
                image
            </div>

            <div className="text-4xl/11 font-bold text-txtClr px-9 pt-9 pb-4">Building RESTful APIs with Node and Express</div>

            <div>
                <div className="dateTag ml-9">date</div>
            </div>

            <div className="p-9">
                <p className="text-lg/6 text-txtClr">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, dolore sed exercitationem ratione ex dignissimos est autem earum quis accusamus explicabo eveniet error quae vitae amet ut minima non commodi! Voluptas quidem placeat natus, dicta aperiam, repudiandae similique ullam, ratione minus nulla dolores est amet ipsum. Optio suscipit repudiandae nisi rerum, assumenda cumque. Aspernatur debitis hic earum dicta animi magnam dolore perferendis! Magnam libero rem nam dolorem recusandae pariatur asperiores ipsum vero sequi iste fugit, esse laboriosam voluptatibus eius id sapiente sed earum porro? Fuga unde commodi eveniet maiores! Aperiam laborum autem, libero quo nemo rerum vero non! Cumque, repudiandae?</p>
            </div>

            {
                authUser
                && <LeaveComment postId={id} setPostWithComments={setPostWithComments} />
            }

            <div className="p-5 flex flex-col gap-6">
                <p className="text-3xl font-semibold text-txtClr ">Comments(5)</p>
                <div className="flex flex-col gap-4">
                    {comments?.map(comment => <Comment key={comment.commentId} comment={comment} />)}
                </div>
            </div>

        </div>
    )
}

export default PostPage