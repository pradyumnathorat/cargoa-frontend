import React from 'react'
import './post.css'
const CreatePost = () => {
  return (
    <>
    <div className="main">
        <div className="form">
            <input type="text" placeholder='Name' />
            <input type="text" placeholder='Age'/>
            <input type="Number" placeholder='Mobile No'/>
            <div className="btn btn-danger">Post</div>
        </div>
    </div>
    </>
  )
}

export default CreatePost