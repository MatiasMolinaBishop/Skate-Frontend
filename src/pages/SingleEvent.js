import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../pages/CSS/SingleEvent.css'
import Modal from "../components/Modal";
import Comments from "../components/Comments";

const SingleEvent = () => {

    const [event, setEvent] = useState([])
    const [attending, setAttending] = useState(true)
    const { eventId } = useParams()
    const [isOpen, setIsOpen] = useState(false)


    const modalHandler = (event) => {
        setIsOpen(true)
    }

    const modalClose = (event) => {
        setIsOpen(false)
    }

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

    const attendingEvent = async () => {
        //const storedToken = localStorage.getItem("authToken");
        console.log(storedToken)

        try {
            console.log('HI')
            console.log(eventId)
            await axios.post(`http://localhost:5005/api/attending/${eventId}`, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log('ATTENDING')
            alert('Attendng Status Changed!');

        } catch (err) {
            console.log(err)
        }
        setAttending(!attending)
    }

    useEffect(() => {
        fetchtEvent()
    }, [attending])


    return (
        <div>
            <h1 className="single-event-title">RSVP to this •<span className='span-blue'>EVENT</span>•</h1>
            {event.title &&
                <div className="event-card">
                    <Link to={`/profile/${event.creator._id}`}>
                        <div className="event-creator-flex">
                            {/* <Link to={`/profile/${event.creator._id}`}> */}
                            <img className='event-creator-img' src={event.creator.img} alt='profile img' />
                            <h3 className="event-creator-name">{event.creator.name}</h3>
                            {/* </Link> */}
                        </div>
                    </Link>
                    <img className='single-event-img' src={event.img} alt='event' img />
                    {attending ? <p className="event-title-p"> RSVP below to confirm you are attending this event</p > : <p className="event-title-p">Please unRSVP if you will not be attending this event</p>}
                    <button onClick={attendingEvent} className='rsvp-button'>{attending ? 'RSVP' : 'UnRSVP'}</button>
                    <h2 className="event-title-card">{event.title}</h2>
                    <p className="event-title-p">People attending: {event.attending.length}</p>
                    <button className="attending-modal-button" onClick={modalHandler}>See Whos Attending</button>
                    <Modal open={isOpen} onClose={modalClose}>
                        <h1 className="modal-content-title">People Attending</h1>
                        <div className="modal-line"></div>
                        <div className="attending-list-flex">
                            {event.attending.map((evento) => {
                                return (
                                    <div className="attending-user-flex">
                                        <p className="attending-user-p">{evento.name}</p>
                                        <img className='event-creator-img' src={evento.img} alt='attending users' />
                                    </div>
                                )
                            })}
                        </div>
                    </Modal>
                    <div className="event-info-card">
                        <h3 className="event-title-p">{event.location.title}</h3>
                        <p className="event-title-p">{event.description}</p>
                    </div>
                    <Comments eventId={event._id} fetchtEvent={fetchtEvent} />
                    <div className="skateboy-bottom">
                        <span class="material-symbols-outlined">skateboarding</span>
                    </div>
                </div>}


        </div>
    )
}

export default SingleEvent;

//MAP over comments so they are displayed
//If you are the creator of the venet make it possible for you to delete and edit the event (Complete CRUD operations)