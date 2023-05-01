import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import EditProfileForm from "../components/EdditProfileForm";
import '../pages/CSS/Profile.css'
import { motion } from 'framer-motion'

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

    const deleteEvent = async (id) => {
        console.log('DELETED')


        try {
            await axios.delete(`https://we-love-boards.herokuapp.com/api/events/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            alert('You deleted this event')
            fetchProfile()


        } catch (err) {
            console.log(err)
        }
    }

    const fetchProfile = useCallback(async () => {

        try {
            const response = await axios.get(`https://we-love-boards.herokuapp.com/api/profile`, { headers: { Authorization: `Bearer ${storedToken}` } })
            // console.log(response)
            setProfile(response.data)
            // console.log(profile)

        } catch (err) {
            console.log(err)
        }
    }, [storedToken])

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
                        <button className="edit-button" onClick={modalHandler}>Edit Profile</button>
                    </div>
                    <div>
                        <h2 className="profile-title">Events Created:</h2>
                        <div className="right-flex">
                            {/* NEED TO ADD KEY WHEN I MAP OVER SOMETHING GO OVER ALL PAGES AND CHECK */}
                            {/* CHECK KEYS SOMEHOE USE THEM TO KNOW THE ID */}
                            {profile.events.map((evento, index) => {
                                return (

                                    <div key={index} className="profile-event-flex">
                                        <p className="p-event">{evento.title}</p>
                                        <img className='event-creator-img' src={evento.img} alt='attending users' />
                                        <button className="delete-button" onClick={() => deleteEvent(evento._id)}>DELETE</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            <div className='line-profile'></div>
            <div>
                <Modal open={isOpen} onClose={modalClose}>
                    <EditProfileForm fetchProfile={fetchProfile} modalClose={modalClose} />
                </Modal>
            </div>
        </motion.div>
    )
}

export default Profile