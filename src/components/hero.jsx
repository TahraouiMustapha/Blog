import Logo from '../components/logoName'
import PrimaryBtn from './primaryBtn'
import LinkBtn from './linkBtn'

const Welcome = () => {
    return (
        <div className='m-14'>
            <div className='flex flex-col items-center gap-6'>
                <h2 className='text-4xl font-bold'>
                    Welcome to <Logo />
                </h2>
                <p className='text-lg/7 text-center'>
                    Hi there! My name is Dominik Augustyn, and this is my blog: written by an aspiring web developer, for other aspiring developers. Feel free to read all about my insights, experiences, tips and reflections!
                </p>
                <div className='flex items-center justify-center gap-8 text-lg'>
                    <PrimaryBtn to='/signup'>Sign Up Now !</PrimaryBtn>
                    <LinkBtn to='/about'>Read about me !</LinkBtn>
                </div>
            </div>
        </div>
    )
}

// old version 
// const Welcome = () => {
//     return (
//         <div className='flex-1 flex justify-center border-r border-brdClr'>
//             <div className='w-[50%] pt-7 pb-8 flex flex-col justify-between'>
//                 <h2 className='text-6xl/17 font-bold'>
//                     Welcome to <Logo />
//                 </h2>
//                 <p className='text-xl/8'>
//                     Hi there! My name is Dominik Augustyn, and this is my blog: written by an aspiring web developer, for other aspiring developers. Feel free to read all about my insights, experiences, tips and reflections!
//                 </p>
//                 <div className='flex justify-start items-center gap-12 text-lg'>
//                     <PrimaryBtn to='/signup'>Sign Up Now !</PrimaryBtn>
//                     <LinkBtn to='/about'>Read about me</LinkBtn>
//                 </div>
//             </div>
//         </div>
//     )
// }

const Hero = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Welcome />
            <div className='flex-1 AboutMeImg bg-cover bg-no-repeat bg-center'>
                image
            </div>
        </div>
    )
}


// old version 

// const Hero = () => {
//     return (
//         <div className='h-[55vh] border-b border-brdClr flex'>
//             <Welcome />
//             <div className='w-[50%]'>
//                 image
//             </div>
//         </div>
//     )
// }

export default Hero;