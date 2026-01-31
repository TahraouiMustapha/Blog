import Hero from "../components/hero";
import useGetPosts from "../hooks/useGetPosts";

const Home = () => {
    const { posts, error, loading } = useGetPosts();
    console.log(posts)
    return (
        <div className="flex-1">
            <Hero />
            <div>Posts</div>
        </div>
    )
}

export default Home;