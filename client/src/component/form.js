import React, { useState }  from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import './css/form.css'
import img1 from './image/icon.svg';
import camera from './image/camera1.png';

 const Addpost= ()=> {

    var [form,setForm]=useState("")
    var [author,setAuthor]=useState("")
    var [location,setLocation]=useState("")
    var[file,setFile]=useState("")
   
    const nameUpdate=(e)=>{ // Dealing with name field changes to update our state
        // setForm({...form,[e.target.name]:e.target.value});
        const { value } = e.target;
        setForm(value);
       
    }

    const locationUpdate=(e)=>{ // Dealing with name field changes to update our state
        // setForm({...form,[e.target.name]:e.target.value});
        const { value } = e.target;
        setLocation(value);
      
    }

    const authorUpdate=(e)=>{ // Dealing with name field changes to update our state
        // setForm({...form,[e.target.name]:e.target.value});
        const { value } = e.target;
        setAuthor(value);
        console.log(setAuthor)
    }
const imageupload=(e)=>{

 //setFile({...file,[e.target.name]:e.target.files[0]});
setFile(e.target.files[0])
//setFile({...file,image:e.target.files[0]});
console.log(setFile)
}

//navigation path
const nav=useNavigate()

    const handleSubmit=async(e)=> { // Once the form has been submitted, this function will post to the backend
        e.preventDefault();
        console.log(form)

     
     var formData = new FormData();
     formData.append("image", file);
     formData.append("author", author);
     formData.append("location", location);
     formData.append("description", form);
   
 
     const config = {
       headers: {
         "Content-Type": "multipart/form-data"
       }
     }
 
     const res = await axios.post("http://localhost:8080/post", formData, config);
 
     if (res.data.status === 401 || !res.data) {
       console.log("errror")
     } else {
       
        nav("/postview") 
     }
    }


    return (
        <>
        <header>
     
        <img id='p1' src={img1} alt='avtaar'></img>
      <p id='logot'>Instaclone</p>
      <img id='cam' src={camera} alt='avtaar' ></img>
      
       </header>
        <div className="main">
            <form method='POST' onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
              
                <input type="file"  name="image"  className='inputbox'   onChange={imageupload} encType="multipart/form-data" style={{width:'90%', border:" 1px solid #999494"}}></input><br></br>
                <input required name="author" placeholder='Author' className='inputbox'   onChange={authorUpdate}></input>
              <input required name="location" placeholder='Location' className='inputbox'   onChange={locationUpdate}></input><br></br>
                <input required name="description" placeholder='Description' className='inputbox'  onChange={nameUpdate} style={{width:'90%'}}></input><br></br>
                <button type="submit" >post</button>
            </form>
        </div>
        </>
    )
    
}

export default Addpost