import '../pages/CSS/HomePage.css'
import ImageSlider from '../components/ImageSlider';
import Accordion from '../components/Accordion';
import { motion } from 'framer-motion'
// import { useEffect, useState } from "react";

const HomePage = () => {

    // const [currentImage, setCurrentImage] = useState(0);

    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1513737567531-bc431c8e5e85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1cmZ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            title: 'Join Today',
            description: 'Create an account and start making friends!'
        },
        {
            url: 'https://images.unsplash.com/photo-1620283687963-4733dbf7359d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHNrYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            title: 'Attend Events',
            description: 'Be part of the BOARD lovers community'
        },
        {
            url: 'https://images.unsplash.com/photo-1516149893016-813d9a01d5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGZyaWVuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            title: 'Create Events!',
            description: 'Create events and see whos comming'
        },
        {
            url: 'https://images.unsplash.com/photo-1529669851596-ba9a5549af95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25vd2JvYXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            title: 'Make Friends!',
            description: 'Happy hippie birthday'
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <div>
                <h1 className="home-title">skate surf snow •<span className='blue-span'>BOARD</span>•</h1>
            </div>
            <div className='carousel'>
                <ImageSlider slides={slides} parentWidth={695} />
            </div>
            <div className='accordion-center'>
                <Accordion />
            </div>
        </motion.div>
    );
}

export default HomePage;