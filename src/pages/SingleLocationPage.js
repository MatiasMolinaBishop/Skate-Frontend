import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import '../pages/CSS/SingleLocationPage.css'

const SingleLocationPage = () => {

    const [location, setLocation] = useState([])
    // Get the URL parameter `:locationId`   
    //useParams is a hook that comes with eact router that allows us to acess the query.parfams from the url
    const { locationId } = useParams()

    const fetchLocation = async () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        try {
            const response = await axios.get(`http://localhost:5005/api/locations/${locationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
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

    // const getAllEvents = () => {
    //     console.log('HANDLE THIS LATER')
    // }

    return (
        <div>
            <div>
                <h1 className="single-location-title">{location.title}</h1>
                <div className="single-location-card">
                    <div className="container">
                        <img className='locations-card-img ' src={location.img} alt='skatepark img' />
                        <div className="card-body">
                            <h1 className="locations-card-title">{location.title}</h1>
                            <p className="locations-card-description">{location.description}</p>
                            <button className="create-button">Create Event</button>

                        </div>
                    </div>
                </div>

            </div>
            {/* LATER ON WE WANT TO MAP OVER ALL THE EVENTS THAT EXIST ON EACH LOCATION */}
            <AddEvent fetchLocation={fetchLocation} locationId={locationId} />
            <div>
                {location.events &&
                    location.events.map((event) => (
                        <div className="events-card">
                            <Link to={`/events/${event._id}`} key={event._id}>
                                <div className="events-card-flex">
                                    <img className='events-card-img' src={event.img} alt='event img' />
                                    <div>
                                        <h3 className="events-card-title">{event.title}</h3>
                                        <p className="events-card-p">{event.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="skateboy-bottom">
                <span class="material-symbols-outlined">skateboarding</span>
            </div>
        </div>
    )
}

export default SingleLocationPage;