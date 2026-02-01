import Hero from "../components/hero";
import PostsContainer from "../components/PostsContainer";

const Home = () => {
    return (
        <div className="flex-1">
            <Hero />
            <PostsContainer />
        </div>
    )
}

export default Home;