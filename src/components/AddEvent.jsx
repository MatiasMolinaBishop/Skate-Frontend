import { useState } from "react";
import axios from "axios";
import '../components/CSS/Navbar.css'
import '../components/CSS/AddEvent.css'

const AddEvent = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('')
    const [date, setDate] = useState('')

    const handleSubmoit = async(e) => {
        e.preventDefault()
        const locationId = props.locationId; 
        const requestBody = {title, description, img, locationId, date}
        const storedToken = localStorage.getItem("authToken");

        try{
            await axios.post('http://localhost:5005/api/new-event', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log('event created')
            setTitle('')
            setDescription('')
            setImg('')
            setDate('')
            //When we add an event this function will be invoked and the list of events will update showing the newly created event
            props.modalClose()
            props.fetchLocation()
            alert('Event Created!');
            
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
        <div className="form">
            <h2 className='locations-title'>Create Event</h2>
            <form onSubmit={handleSubmoit}>
                <section>
                <label  htmlFor='title'>Event Title / Name:</label>
                <input
                     type="text"
                     name="title"
                     id="title"
                     placeholder="Title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                />  
                {/* <label>Event Title:</label>
                 <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /> */}
 
                <label  htmlFor='description'>Description:</label>
                <textarea
                    type="text"
                    rows="5"
                    cols="20"
                    id="description"
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor='img'>Upload Image:</label>
                <input
                    type="text"
                    name="img"
                    placeholder="upload img"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />  
                <label for="date">Choose Date:</label>
                <input 
                    type="date" 
                    id="date" 
                    name="birthdate" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                </section>
                <section>
                    <div className="submit-form-section">
                        <div className="photo-container">
                            {img? <img src={img} alt='profile-img-preview'/>:<img src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyaWVuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' alt='profile-img-preview'/>}
                            {/* <img src={img} alt='profile-img-preview'/> */}
                        </div>
                        <button type='submit' className="button-add-event">Submit</button>
                    </div>
                </section>
            </form>
        </div>
        </> 
    )
}

export default AddEvent