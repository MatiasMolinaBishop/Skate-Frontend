import '../components/CSS/Accordion.css'
import AccordionContent from './AccordionContent'

const Accordion = () => {

    const dataArray = [
        {
            question:'Why is this helpful?',
            answer:'Find others who share your passion. Its a great way to make new frineds'   
        },
        {
            question:'How does it work?',
            answer:'Create an account and start making plans with cool people. You can create events so other users can contact and connect with you. You can also see other users events by location and sport and RSVP to let them know you are attending.'   
        },
        {
            question:'Who built this?',
            answer:'Hi, I am Matias a fullstack web developer and civil engineer. This web application was built for learning purposes to develop and practice my programming skiills'   
        },
        {
            question:'What tech was used to build this?',
            answer:'This web application was built with JavaSciript and NodeJS. More specifically with Express & MongoDB (Mongoose) for the backend and React for the frontend'   
        }
    ]

    return(
        <div>
            <div>
                <h3 className="main-title">Find Out More</h3>
                <div className="main-title-underline "></div>
                {dataArray.map((data, index) => (
                    <AccordionContent key={index} data={data}/>
                ))} 

            </div>
        </div>
    )
}

export default Accordion