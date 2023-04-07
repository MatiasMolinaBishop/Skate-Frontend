import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../pages/CSS/SingleEvent.css'

const SingleEvent = () => {

    const [event, setEvent] = useState([])
    const [attending, setAttending] = useState(true)
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

    const attendingEvent = () => {
        setAttending(!attending)

    }

    useEffect(() => {
        fetchtEvent()
    }, [])

    return (
        <div>
            <h1 className="single-event-title">RSVP to this EVENT</h1>
            {event.title &&
                <div className="event-card">
                    <div className="event-creator-flex">
                        <img className='event-creator-img' src={event.creator.img} alt='profile img' />
                        <h3 className="event-creator-name">{event.creator.name}</h3>
                    </div>
                    <img className='single-event-img' src={event.img} alt='event' img />
                    <h3 className="event-title-card">{event.title}</h3>
                    <p className="event-title-p">{event.description}</p>
                    <button onClick={attendingEvent}>{attending ? 'RSVP' : 'UnRSVP'}</button>

                </div>}
            <h1>Commenst</h1>
        </div>
    )
}

export default SingleEvent;

//TO DO: 
//MAP over comments so they are displayed
//Add attending / RSVP button to let others know you are attending and have it save on your profile
//If you are the creator of the venet make it possible for you to delete and edit the event (Complete CRUD operations)