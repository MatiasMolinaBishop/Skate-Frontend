import useOpenController from "./useOpenController"

const AccordionContent = ({key, data }) => {

    const {isOpen, toggle } = useOpenController(false)

    return (
        <div className="accordion-container">
            <ExpendableColumn question = {data.question} isOpen = {isOpen} toggle = {toggle}/>
            {isOpen && <TextSection answer = {data.answer} isOpen={isOpen}/>}
            <div className="underline"></div>
            
        </div>
    )
}

export default AccordionContent

export const ExpendableColumn = ({question, isOpen, toggle}) => {
    return (
    <div className="column-container" onClick = {toggle}>
        <div className="column-text">
            {question}
        </div>
        <button className="expendable-button">
            <span class="material-symbols-outlined" style={{transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: "all 0.5s"}}>expand_more</span>
        </button>
    </div>
)}

export const TextSection = ({answer, isOpen}) => {
    return (
        <div className="column-container">
            <div className="text-container">
                {answer}
            </div>
        </div>
)}