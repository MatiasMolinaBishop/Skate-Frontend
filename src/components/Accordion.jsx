import '../components/CSS/Accordion.css'
import AccordionContent from './AccordionContent'

const Accordion = () => {

    const dataArray = [
        {
            question:'Why is this helpful?',
            answer:'Find others who share your passion. Its a great way to make new frineds'   
        },
        {
            question:'I already have friends..',
            answer:'Yea but what if they are busy? What if you are away on holiday? What if you just moved in to a new city?'   
        },
        {
            question:'Who built this?',
            answer:'Hi, I am Matias and I built this web application to develop and practice my programming skiills'   
        },
        {
            question:'What tech did you use?',
            answer:'This web applcation was built with JavaSciript and NodeJS. More specifically with Express & MongoDB for the backend and React for the frontend'   
        },

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