import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../pages/CSS/LocationsPage.css'
import FilterSport from "../components/FilterSport";
import { motion } from 'framer-motion'


const Locations = () => {

    const [locations, setLocations] = useState([])
    const [filter, setFilter] = useState(null);
    const APIurl = 'https://we-love-boards.herokuapp.com/api/locations'

    const fetchLocations = async () => {
        const storedToken = localStorage.getItem("authToken");

        try {
            const response = await axios.get(APIurl, { headers: { Authorization: `Bearer ${storedToken}` } })
            const data = response.data
            setLocations(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    console.log(locations)

    const filteredLocations = filter
        ? locations.filter((location) => location.board === filter)
        : locations;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className='locations-title'>Discover •<span className='span-blue'>Locations</span>•</h1>
            {/* <p className='locations-title'>Create or see events happening at your prefered location!</p> */}
            <FilterSport setFilter={setFilter} />
            <div className="line-separate"></div>
            <div className="locations-flex">
                {filteredLocations.map((location) => {
                    return (

                        <div className='location-card' key={location._id}>
                            <div className="container">
                                <Link to={`/locations/${location._id}`}>
                                    {/* <h3>{location.title}</h3> */}
                                    <img className='locations-card-img' src={location.img} alt='skatepark img' />
                                    <div className="card-body">
                                        <h1 className="locations-card-title">{location.title}</h1>
                                        <p className="locations-card-description">{location.description}</p>
                                        <p className="locations-card-description">{location.city}</p>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    )
                })}
            </div>
        </motion.div>
    );
}

export default Locations;