import { format } from 'date-fns'
// authorId
// postId
// published


// date
// "2025-12-27T16:25:39.505Z"
// text
// thumbnailUrl
// title

const BlogCard = ({ post }) => {
    const date = format(post.date, "do LLL yyyy")

    return (
        <div className="cursor-pointer border border-brdClr rounded-lg shadow-xl flex flex-col border-transition hover:border-primary">
            <div className="h-[50%]">
                {/* image */}
                image
            </div>

            <div className="flex-1 p-6 flex flex-col gap-2">
                <div className="text-lg font-semibold">{post.title}</div>
                <p className='w-fit p-1.5 rounded-lg text-sm font-bold tracking-wide text-[#B45309] bg-[#FEF3C7]'>{date}</p>
                <p className="text-sm/4.5 text-txtClr/70 line-clamp-5">
                    {post.text}
                </p>
            </div>
        </div>
    )
}

export default BlogCard