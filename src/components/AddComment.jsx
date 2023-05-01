import { useState } from "react";
import axios from "axios";
import '../components/CSS/AddComment.css'


const AddComment = (props) => {

    const [comment, setComment] = useState('');
   
    const handleSubmoit = async(e) => {
        e.preventDefault()
        const eventId = props.eventId; 
        const requestBody = {comment, eventId}
        const storedToken = localStorage.getItem("authToken");

        try{
            await axios.post('https://we-love-boards.herokuapp.com/api/new-comment', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log('comment posted')
            setComment('')
            //When we add an event this function will be invoked and the list of events will update showing the newly created event
            props.fetchtEvent()
            props.fetchComments()
            alert('Comment Posted!');
            
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
        <div>
            <form onSubmit={handleSubmoit} className="add-comment-form">
                <input
                     type="text"
                     name="comment"
                     id="comment"
                     placeholder="Add a comment"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                /> 
                <button type="submit" className="post-button">POST</button> 
            </form>
        </div>
        </> 
    )
}

export default AddComment