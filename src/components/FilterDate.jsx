import '../components/CSS/FilterSport.css'

const FilterDate = (props) => {

    const filterAll =() => {
        props.setSelectedDate(null)
        console.log('I AM CLICKING')
    }

     const filterDate = (e) => {
         props.setSelectedDate(e.target.value)
         console.log('DATE SELECTED')
         console.log(e.target.value)

    }

    return (
        <div className="filter-sport-flex">
            <div className="filter-sport-type-flex">
                <button className='button-filter-sport' onClick={filterAll}>All</button>
            </div>
             <div className="filter-sport-type-flex">
                <input type='date' onChange={ filterDate}></input>
            </div>
        </div>
    )
}

export default FilterDate
