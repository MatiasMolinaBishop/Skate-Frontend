import { useState, useEffect } from "react";
import axios from "axios";
import '../components/CSS/Comments.css'

const Comments = () => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
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
            <h1>Comments</h1>
        </div>
    )
}

export default Comments