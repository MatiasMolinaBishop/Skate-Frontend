const AccordionContent = ({key, data }) => {
    return (
        <div className="accordion-container">
            <ExpendableColumn question = {data.question}/>
            <TextSection answer = {data.answer}/>
        </div>
    )
}

export default AccordionContent

export const ExpendableColumn = ({question}) => {
    return (
    <div className="column-container">
        <div className="column-text">
            {question}
        </div>
        <button className="expendable-button">
            <span class="material-symbols-outlined">expand_more</span>
        </button>
    </div>
)}

export const TextSection = ({answer}) => {
    return (
        <div className="column-container">
            <div className="column-text">
                {answer}
            </div>
        </div>
)}