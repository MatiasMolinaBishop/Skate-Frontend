import { useState } from "react";
import axios from "axios";
import '../components/CSS/AddEvent.css'

const EditProfileForm = (props) => {

    const [name, setName] = useState('');
    const [img, setImg] = useState('')

    const handleSubmoit = async(e) => {
        e.preventDefault()
        const requestBody = {name, img}
        const storedToken = localStorage.getItem("authToken");

        try{
            await axios.patch('http://localhost:5005/api//profile/edit', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            setName('')
            setImg('')
            props.modalClose()
            props.fetchProfile()
            alert('Profile Edited!');
            
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
        <div className="form">
            <h2 className='locations-title'>Edit Profile</h2>
            <form onSubmit={handleSubmoit}>
                <section>
                <label  htmlFor='name'>Edit Name:</label>
                <input
                     type="text"
                     name="name"
                     id="name"
                     placeholder="Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                />  
                <label htmlFor='img'>Update Image:</label>
                <input
                    type="text"
                    name="img"
                    placeholder="upload img"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />  
                </section>
                <section>
                    <div className="submit-form-section">
                        <div className="photo-container">
                            {img? <img src={img} alt='profile-img-preview'/>:<img src='https://media.istockphoto.com/id/1128914659/es/foto/mujer-bonita-de-moda-con-auriculares-escuchando-m%C3%BAsica-sobre-fondo-de-ne%C3%B3n.jpg?s=612x612&w=0&k=20&c=w3fNlbKxpYxQt3vIgkM5g3UETdAOp4-YPVboPJNwG9M=' alt='profile-img-preview'/>}
                        </div>
                        <button type='submit' className="button-add-event">Submit</button>
                    </div>
                </section>
            </form>
        </div>
        </> 
    )
}

export default EditProfileForm 