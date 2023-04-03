import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Locations = () => {

    const [locations, setLocations] = useState([])
    const APIurl = 'http://localhost:5005/api/locations'

    const fetchLocations = async () => {

        try {
            const response = await axios.get(APIurl)
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

    return (
        <div>
            <h1>LOCATIONS</h1>
            {locations.map((location) => {
                return (
                    <div className='location-card'>
                        <Link to={`/locations/${location._id}`}>
                            <h3>{location.title}</h3>
                            <img src={location.img} alt='skatepark img' />
                        </Link>
                    </div>

                )
            })}
        </div>
    );
}

export default Locations;