import Logo from '../components/logoName'
import PrimaryBtn from './primaryBtn'
import LinkBtn from './linkBtn'

const Welcome = () => {
    return (
        <div className='m-14 xl:w-[40%] xl:flex xl:justify-center'>
            <div className='flex flex-col items-center gap-6 xl:gap-5 xl:w-[60%]'>
                <h2 className='text-4xl xl:text-5xl/12 font-bold'>
                    Welcome to <Logo />
                </h2>
                <p className='text-lg/7 text-justify'>
                    Hi there! My name is Tahraoui Mustapha, and this is my blog: written by an aspiring web developer, for other aspiring developers. Feel free to read all about my insights, experiences, tips and reflections!
                </p>
                <div className='flex items-center justify-center gap-8 text-lg'>
                    <PrimaryBtn to='/signup'>Sign Up Now !</PrimaryBtn>
                    <LinkBtn to='/about'>Read about me !</LinkBtn>
                </div>
            </div>
        </div>
    )
}

const Hero = () => {
    return (
        <div className='flex flex-col h-screen border-b border-brdClr xl:flex-row xl:h-[55vh]'>
            <Welcome />
            <div className='flex-1 bg-[url("./assets/bigImg.jpg")]  bg-cover bg-no-repeat bg-center border-l border-brdClr overflow-hidden' />
        </div>
    )
}

export default Hero;