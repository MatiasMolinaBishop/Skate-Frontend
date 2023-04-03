import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";

const SingleLocationPage = () => {

    const [location, setLocation] = useState([])
    // Get the URL parameter `:locationId`   
    //useParams is a hook that comes with eact router that allows us to acess the query.parfams from the url
    const { locationId } = useParams()

    const fetchLocation = async () => {

        try {
            const response = await axios.get(`http://localhost:5005/api/locations/${locationId}`)
            setLocation(response.data)
            console.log(location)
            //console.log('SHIT')

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [])

    const getAllEvents = () => {
        console.log('HANDLE THIS LATER')
    }

    return (
        <div>
            <div>
                <h3>{location.title}</h3>
                <img src={location.img} alt='skatepark img' />
                <p>{location.description}</p>
            </div>
            {/* LATER ON WE WANT TO MAP OVER ALL THE EVENTS THAT EXIST ON EACH LOCATION */}
            <AddEvent refreshEvents={getAllEvents} />
            {location.events &&
                location.events.map((event) => (
                    <Link to={`/events/${event._id}`} key={event._id}>
                        <li className="event-card">
                            <h3>{event.title}</h3>
                            <img src={event.img} alt='event img' />
                            <p>{event.description}</p>
                            {/* <p>{event.creator.name}</p>
                            <img src={event.creator.img} alt='profile img' /> */}
                        </li>
                    </Link>
                ))
            }
            <Link to="/locations">
                <button>Back to Locations</button>
            </Link>
        </div>
    )
}

export default SingleLocationPage;