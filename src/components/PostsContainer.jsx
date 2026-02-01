import { useState } from "react"
import useGetPosts from "../hooks/useGetPosts";


const Posts = ({ posts, loading, error }) => {

    if (error) return <p>Something went wrong while loading the data.</p>
    if (loading) return <p>... Loading</p>

    return (
        <div className="grid grid-cols-[repeat(2,minmax(250px,1fr))] gap-8">
            {/* cards (divs) */}
            {posts.map(post => (
                <div key={post.postId}>{post.title}</div>
            ))}
        </div>
    )
}

const SearchBar = ({ setSearchValue }) => {
    return (
        <input
            type="text"
            placeholder="Search By Title"
            onChange={(e) => {
                setSearchValue(e.target.value)
            }}
            className="border border-brdClr w-3xs h-10 pl-2.5 rounded-sm"
        />
    )
}

const PostsContainer = () => {
    const { posts, error, loading } = useGetPosts()
    const [searchValue, setSearchValue] = useState('')



    return (
        <div className="pt-12 pb-12 flex flex-col items-center gap-8">
            <h1 className="text-5xl font-bold">Available <span className="text-primary">TOP</span> blog articles</h1>
            <SearchBar setSearchValue={setSearchValue} />
            <Posts posts={posts} loading={loading} error={error} />
        </div>
    )
}

export default PostsContainer