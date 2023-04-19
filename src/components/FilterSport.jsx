import '../components/CSS/FilterSport.css'

const FilterSport = (props) => {

    const filterAll =() => {
        props.setFilter(null)
    }

    const filterSurf =() => {
        props.setFilter('surf')
    }

    const filterSnowboard =() => {
        props.setFilter('snowboard')
    }





    return (
        <div className="filter-sport-flex">
             <div className="filter-sport-type-flex">
                <button className='button-filter-sport' onClick={filterAll}>All</button>
            </div>
            <div className="filter-sport-type-flex">
                <span class="material-symbols-outlined">skateboarding</span>
                <button  className='button-filter-sport' onClick={() => props.setFilter('sakate')}>Skate</button>
            </div>
            <div className="filter-sport-type-flex">
            <span class="material-symbols-outlined">water</span>
                <button  className='button-filter-sport' onClick={() =>props.setFilter('surf')}>Surf</button>
            </div>
            <div className="filter-sport-type-flex">
            <span class="material-symbols-outlined">snowboarding</span>
                <button  className='button-filter-sport' onClick={() => props.setFilter('snowboard')}>Snowboard</button>
            </div>
        </div>
    )
}

export default FilterSport



