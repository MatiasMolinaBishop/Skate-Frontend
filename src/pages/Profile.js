import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import '../pages/CSS/Profile.css'

const Profile = () => {

    const [profile, setProfile] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const storedToken = localStorage.getItem("authToken");

    const modalHandler = (event) => {
        setIsOpen(true)
    }

    const modalClose = (event) => {
        setIsOpen(false)
    }

    const fetchProfile = async () => {

        try {
            const response = await axios.get(`http://localhost:5005/api/profile`, { headers: { Authorization: `Bearer ${storedToken}` } })
            // console.log(response)
            setProfile(response.data)
            // console.log(profile)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])


    return (
        <div>
            <h1 className="profile-title">We Love <span className="blue-span">BOARDS</span></h1>
            <div className='line-profile'></div>
            <div className='left-flex'>
                <img className='profile-img' src={profile.img} alt='profile img' />
                <h1 className="profile-name">{profile.name}</h1>
                <button>Edit Profile</button>
            </div>
            <div className='line-profile'></div>
        </div>
    )
}

export default Profile