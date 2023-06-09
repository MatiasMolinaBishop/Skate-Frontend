import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import '../components/CSS/Comments.css'
import moment from 'moment';
import AddComment from "./AddComment";

const Comments = (props) => {

    // const [comments, setComments] = useState([])
    const [specificComments, setSpecificComments] = useState(null)
    //const [newComment, setNewComment] = useState('')
    // const [eventComments, setEventComents] = useState([])
    const storedToken = localStorage.getItem("authToken");

    let filteredComments = []

    const getSpecificComments = useCallback((arr) => {
        return arr.filter((item) => item.event === props.eventId);
     }, [props.eventId])

    const fetchComments = useCallback(async() => {
        try{
            const response = await axios.get(`https://we-love-boards.herokuapp.com/api/comments`, { headers: { Authorization: `Bearer ${storedToken}` } })
            setSpecificComments(getSpecificComments(response.data))
            
        }catch(err){
            console.log(err)
        }
    }, [getSpecificComments, storedToken])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])


    return(
        <div>
            {specificComments? 
            <div>
            <h1 className='comments-title'>{specificComments.length} Comments</h1>
            <AddComment eventId={props.eventId} fetchtEvent={props.fetchtEvent} fetchComments={fetchComments}/>
         
            {specificComments.map((comment) => {
                return(
                    <div className="comment-flex">
                        <img src={comment.creator.img} alt='user img' className='comments-creator-img'/>
                        <div className="comment-and-name-flex">
                            <h3 className="comment-creator">{comment.creator.name}</h3>
                            <p>{comment.comment}</p>
                            <p>{filteredComments.comment}</p>
                            <p className="date">{ moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>
                    </div>
                )
                })}
                </div>: <h1>hi</h1>}
        </div>
    )
}

export default Comments