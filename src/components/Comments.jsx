import { useState, useEffect } from "react";
import axios from "axios";
import '../components/CSS/Comments.css'
import moment from 'moment';
import AddComment from "./AddComment";

//pass the event id through props so that it only displayes comments matching the event

const Comments = (props) => {

    const [comments, setComments] = useState([])
    //const [newComment, setNewComment] = useState('')
    const [eventComments, setEventComents] = useState([])
    const storedToken = localStorage.getItem("authToken");

    const fetchComments = async() => {
        console.log('TEST')

        try{
            const response = await axios.get(`http://localhost:5005/api/comments`, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(response)
            setComments(response.data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

   

    return(
        <div>
            <h1 className='comments-title'>{comments.length} Comments</h1>
            <AddComment eventId={props.eventId} fetchtEvent={props.fetchtEvent} fetchComments={fetchComments}/>
            {/* <h1>{props.eventId}</h1> */}
            {comments.map((comment) => {
                return(
                    <div className="comment-flex">
                        <img src={comment.creator.img} alt='user img' className='comments-creator-img'/>
                        <div className="comment-and-name-flex">
                        <h3 className="comment-creator">{comment.creator.name}</h3>
                        <p>{comment.comment}</p>
                       
                        <p className="date">{ moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                    </div>
                )
                })}
        </div>
    )
}

export default Comments