import { useState, useEffect, useRef, useCallback } from "react"

const ImageSlider = ({slides}) => {

    const timerRef = useRef(null) //We want something mutable to be stored between renders
    const [currentIndex, setCurrentIndex] = useState(2)


    //STYLES this className is give to the div which holds the carousel

    // .carousel {
    //     width: 695px;
    //     height: 340px;
    //     margin: 20px auto;
    
    // }
    

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
        const isFirstSlide = currentIndex === 0; // This return either true or false 
        const newIndex = isFirstSlide ? slides.length - 1: currentIndex-1;
        setCurrentIndex(newIndex)
        //false since initially we useState(2)
        //newIndex =  if true (it is 1st slide meaning index 0  on array) then newIndex = the last index (slides.length - 1)
        //If the arr contains 4 images then the last one would be arr[3] but arr.length = 4. 
        //If isFirstSlide is false (like our case) then the newIndex will be whatever the current index is -1
        //Finally this fucntion calls the setCurrentIndex fucntion fiorm the useState hook and it assigns this new index as rthe current index
        //Therefore after clicking it the image that is being displayed will change accrodingly
        // backgroundImage: `url(${slides[currentIndex].url})` In this case we speicify this on the css style

    }

//We can see we have a warning on the goToNext function because it makes dependencies of useEffect and it changes every single render which will cause a loop
//THIS IS THE WARNING: The 'goToNext' function makes the dependencies of useEffect Hook (at line 114) change on every render. To fix this, wrap the definition of 'goToNext' in its own useCallback() Hook.eslintreact-hooks/exhaustive-deps

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }, [currentIndex, slides])

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        //We want to clear this setTimeout when we click the arrows or dots
        if(timerRef.current){
            clearTimeout(timerRef.current)
        }
        console.log('useEffetc()')
        //useRef allow us to create an object whihc we initially set up a value to. timerRef.current NOTE:
        //This object has the name we spicfy in this case timerRef and we can access it key value current (key) whatver we assigned as value (null)
        timerRef.current = setTimeout(() => {
            //Here we are assigning the value to timerRef.current as a setTimeout sideeefect which invokes goToNext() every 4000 milliseconds
            goToNext()
        }, 8000)
        //We alsO must clear the setTimeout after we distroy / unmount our component
        return () => clearTimeout(timerRef.current)
    }, [goToNext])

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