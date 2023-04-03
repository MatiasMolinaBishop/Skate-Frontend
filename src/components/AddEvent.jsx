import { useState } from "react";
import axios from "axios";

const AddEvent = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('')

    const handleSubmoit = async(e) => {
        e.preventDefault()
        const locationId = props.locationId; 
        const requestBody = {title, description, img, locationId}
        const storedToken = localStorage.getItem("authToken");

        try{
            await axios.post('http://localhost:5005/api/new-event', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log('event created')
            setTitle('')
            setDescription('')
            setImg('')
            //When we add an event this function will be invoked and the list of events will update showing the newly created event
            props.fetchLocation()
            
        }catch(err){
            console.log(err)
        }
    }


    return( 
        <div>
            <h2>Create Event</h2>

            <form onSubmit={handleSubmoit}>
                <label>Title:</label>
                 <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
 
                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Upload Image:</label>
                <input
                    type="text"
                    name="img"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />  

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddEvent