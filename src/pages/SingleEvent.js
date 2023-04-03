import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SingleEvent = () => {

    const [event, setEvent] = useState([])
    const { eventId } = useParams()

    const fetchtEvent = async () => {

        const storedToken = localStorage.getItem("authToken");

        try {
            const response = await axios.get(`http://localhost:5005/api/events/${eventId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            setEvent(response.data)
            console.log(event)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchtEvent()
    }, [])

    return (
        <div>
            <h3>RSVP on this event and get in touch with other skaters attending</h3>
            {event.title &&
                <div>
                    <h3>{event.creator.name}</h3>
                    <img src={event.creator.img} alt='profile img' />
                    <h3>{event.title}</h3>
                    <img src={event.img} alt='event' img />
                    <p>{event.description}</p>

                    <Link to="/locations">
                        <button>Back Locations</button>
                    </Link>
                </div>}
        </div>
    )
}

export default SingleEvent;

//TO DO: 
//MAP over comments so they are displayed
//Add attending / RSVP button to let others know you are attending and have it save on your profile
//If you are the creator of the venet make it possible for you to delete and edit the event (Complete CRUD operations)