import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import '../pages/CSS/Profile.css'
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion'

const OthersProfile = () => {

    const [profile, setProfile] = useState({})
    const storedToken = localStorage.getItem("authToken");
    const { userId } = useParams()

    const fetchProfile = useCallback(async () => {

        //http://localhost:5005/api/profile/64359084a0ba636e22bfb8f8

        try {
            const response = await axios.get(`http://localhost:5005/api/profile/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            setProfile(response.data)

        } catch (err) {
            console.log(err)
        }
    }, [storedToken, userId])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="profile-title">We Love <span className="blue-span">BOARDS</span></h1>
            <div className='line-profile'></div>
            {profile.name &&
                <div className="profile-flex">
                    <div className='left-flex'>
                        <img className='profile-img' src={profile.img} alt='profile img' />
                        <h1 className="profile-name">{profile.name}</h1>
                    </div>
                    <div>
                        <h2 className="profile-title">Events Created:</h2>
                        <div className="right-flex">
                            {/* NEED TO POPULATE EBVENNTS */}
                            {profile.events.map((evento, index) => {
                                return (
                                    <div key={index} className="profile-event-flex">
                                        <p className="p-event">{evento.title}</p>
                                        <img className='event-creator-img' src={evento.img} alt='attending users' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            <div className='line-profile'></div>
        </motion.div>
    )
}

export default OthersProfile