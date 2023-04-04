import { useState } from "react"

const ImageSlider = ({slides}) => {

    const [currentIndex, setCurrentIndex] = useState(2)


    //STYLES

    const sliderStyles = {
        height:"100%",
        position:"relative"
    }

    const slidesStyles = {
        width:"100%",
        height:"100%",
        borderRadius: "10px",
        backgroundPosition:"center",
        transition: '0.9s',
        backgroundSize:"cover",
        backgroundImage: `url(${slides[currentIndex].url})`
       
    }

    const leftArrowStyles = {
        position:'absolute',
        top:'50%',
        transform:'translate(0, -50%)',
        left: '32px',
        fontSize:'45px',
        color:'white',
        zIndex:1,
        cursor:'pointer'

    }
    const rightArrowStyles = {
        position:'absolute',
        top:'50%',
        transform:'translate(0, -50%)',
        right: '32px',
        fontSize:'45px',
        color:'white',
        zIndex:1,
        cursor:'pointer'
    }

    const dotContainerStyles = {
        display:'flex',
        justifyContent:'center',
        
    }
    const dotStyles = {
        margin: '0 3',
        fontSize:'30px',
        cursor: "pointer"
        // ":hover": {
        //     color:'red',
        //     cursor: "pointer",
        //   }
    }

    //FUNCTIONS
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1: currentIndex-1;
        setCurrentIndex(newIndex)

    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return(
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>‹</div>
            <div  style={rightArrowStyles} onClick={goToNext}>›</div>
            <div  style={slidesStyles}>
                <div className="carousel-message">
                    <h1>{slides[currentIndex].title}</h1>
                    <br></br>
                    <h3>{slides[currentIndex].description}</h3>
                </div>
            </div>
            <div style={dotContainerStyles}>{slides.map((slide, index) => (
                <div key={index} style={dotStyles} onClick={() =>goToSlide(index)}> • </div>
            ))}
            </div>
        </div>
    )
}

export default ImageSlider

//ADD LOGIN AND SIGNUO LINKS HERE