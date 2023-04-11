import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../pages/CSS/SingleEvent.css'

const SingleEvent = () => {

    const [event, setEvent] = useState([])
    const [attending, setAttending] = useState(true)
    const { eventId } = useParams()

    const storedToken = localStorage.getItem("authToken");

    const fetchtEvent = async () => {

        //const storedToken = localStorage.getItem("authToken");

        try {
            const response = await axios.get(`http://localhost:5005/api/events/${eventId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            setEvent(response.data)
            console.log(event)

        } catch (err) {
            console.log(err)
        }
    }

    //TESSSSTTTTTTTTTTTTTTTTTTT

    const attendingEvent = async () => {

        //const storedToken = localStorage.getItem("authToken");
        console.log(storedToken)

        try {
            console.log('HI')
            console.log(eventId)
            // http://localhost:5005/api/attending/642ac0f5e81634b160ae3f53
            //await axios.post('http://localhost:5005/api/new-event', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            await axios.post(`http://localhost:5005/api/attending/642ac0f5e81634b160ae3f53`, { headers: { Authorization: `Bearer ${storedToken}` } })
            //console.log(response)
        } catch (err) {
            console.log(err)
        }
        setAttending(!attending)
    }

    //TESSSSTTTTTTTTTTTTTTTTTTT

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
                    <button onClick={attendingEvent} className='rsvp-button'>{attending ? 'RSVP' : 'UnRSVP'}</button>
                    <h2 className="event-title-card">{event.title}</h2>
                    <p className="event-title-p">{event.description}</p>
                    <p className="event-title-p">People attending: {event.attending.length}</p>
                    <p className="event-title-p">Location: {event.location.title}</p>
                </div>}
            {/* <h1>Commenst</h1> */}
        </div>
    )
}

export default SingleEvent;

//TO DO: 
//MAP over comments so they are displayed
//Add attending / RSVP button to let others know you are attending and have it save on your profile
//If you are the creator of the venet make it possible for you to delete and edit the event (Complete CRUD operations)