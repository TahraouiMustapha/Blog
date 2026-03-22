const About = () => {
    return (
        <>
            <div className="flex-1 flex flex-col mt-14 gap-8 sm:items-center">
                <p className="text-4xl text-center font-bold">About <span className="text-primary">me.</span></p>
                <div className="flex-1 mx-8 sm:w-[60%]">
                    <div className="AboutMeImg bg-cover bg-no-repeat bg-[position:70%_70%] float-left size-50 md:size-60 lg:size-70 xl:size-90 rounded-full mr-6 mb-6 sm:mr-7 sm:mb-7 textAroundIt animate-turn-to-view"></div>
                    <div className="text-base/7 text-justify">
                        <h3 className="animate-fade-in mb-3">
                            Hi, I’m <span className="text-primary">Mustapha</span>, a junior self-taught <span className="text-primary">web developer</span> from Algeria. Over the past years, I’ve immersed myself in coding and exploring modern web technologies in order to build engaging, functional, and user-friendly web applications. My journey started with curiosity and quickly grew into a strong passion for creating and continuously improving my skills.
                        </h3>
                        <h3 className="animationDelaySd animate-fade-in mb-3">
                            In 2021, I began my studies in <span className="text-primary">computer science</span> at university, where I built my foundational knowledge and developed a growing interest in programming. In 2023, I came across content on social media showcasing real-world <span className='text-primary'>codebase</span>s—it looked complex and intimidating at first, but also incredibly fascinating. I’ve always enjoyed learning new things, and understanding something complicated gives me a strong sense of satisfaction and accomplishment. That curiosity pushed me to go deeper into <span className='text-primary'>web development knowledge</span>, which quickly became my focus. Since then, I’ve been continuously exploring modern technologies, and every time I learn something new—whether it’s a <span className='text-primary'>function</span>, a <span className='text-primary'>language</span>, or a framework—I realize how much more there is to discover. And that’s exactly what keeps me motivated.
                        </h3>
                        <h3 className="animationDelayRd animate-fade-in mb-8">
                            I discovered <span className="text-primary">The Odin Project</span> through a friend and decided to follow it as a structured path in <span className="text-primary">web development</span>. I’ve been working on it for about a year and a half, and it has helped me stay focused and confident in my learning journey.
                        </h3>
                    </div>
                </div>
            </div>



        </>
    )
}


export default About;