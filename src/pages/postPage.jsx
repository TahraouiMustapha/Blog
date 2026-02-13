import { useOutletContext, useParams } from "react-router"
import useGetPostWithComments from "../hooks/useGetPostWithComments"
import { useState } from "react"

import { format } from "date-fns"

const Comment = ({ comment }) => {
    const date = format(comment.date, "do LLL yyyy")

    return (
        <div className="border border-brdClr rounded-md p-3">
            <div className="flex items-center gap-5 mb-2">
                <p className="text-primary text-lg">{comment.username}</p>
                <p className="dateTag ml-auto mr-2">{date}</p>
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
        <div className="flex flex-col gap-3 p-5 md:px-12 lg:px-24 xl:px-9 border-t border-t-brdClr">
            <p className="text-3xl font-semibold text-txtClr">Leave a Comment</p>
            <div className="flex flex-col gap-1">
                <p>Message<span className="text-red-600">*</span></p>
                <textarea
                    value={comment}
                    className="w-[80%] h-20 p-3 border border-brdClr rounded-lg resize-none outline-none border-transition focus:border-primary"
                    placeholder="Write your comment..."
                    onChange={(e) => setComment(e.target.value)}
                    name="text" id="com" />

                <button
                    className="self-start mt-2 bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease-in-out cursor-pointer"
                    onClick={handleCommentCreation}>
                    Comment
                </button>
            </div>
        </div>
    )
}

const PostPage = () => {
    const { id } = useParams()
    const { authUser } = useOutletContext()
    const { postWithComments, setPostWithComments, loading, error } = useGetPostWithComments({ postId: id })

    if (loading) return <p className="text-center">...Loading</p>
    if (error) return <p>A network error was encountered</p>

    const { post = null, comments = null } = postWithComments || {}
    const date = format(post.date, "do LLL yyyy")


    return (
        <div className="flex-1 flex flex-col md:mx-14 xl:mx-96">
            <div
                className="h-76 md:mx-9 rounded-b-xl"
                style={{ backgroundImage: post?.thumbnailUrl ? `url(${post.thumbnailUrl})` : 'none' }}>
                image
            </div>

            <div className="text-4xl/11 font-bold text-txtClr px-9 pt-9 pb-4">{post.title}</div>

            <div>
                <div className="dateTag ml-9">{date}</div>
            </div>

            <div className="p-9">
                <p className="text-lg/6 text-txtClr">{post.text}</p>
            </div>

            {
                authUser
                && <LeaveComment postId={id} setPostWithComments={setPostWithComments} />
            }

            <div className="p-5 md:px-8 lg:px-24 xl:px-9 flex flex-col gap-6 border-t border-t-brdClr">
                <p className="text-3xl font-semibold text-txtClr ">Comments({comments?.length})</p>
                <div className="flex flex-col gap-4">
                    {comments?.map(comment => <Comment key={comment.commentId} comment={comment} />)}
                </div>
            </div>

        </div>
    )
}

export default PostPage