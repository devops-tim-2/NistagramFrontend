import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import toast from "../Shared/Toast";
import {Link} from 'react-router-dom';

import mediaService from '../Services/mediaService'
import postService from '../Services/postService'

export default function AddPost() {
  let history = useHistory()
  const [description, set_description] = useState("");
  const [image_link, set_image_link] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    postService.create({description, image_url: image_link}).then(response => {
        toast.success('Post created')
    }).catch(error => {
        toast.error('Create post failed. Try again.')
    })
  }

  function image_changed(event) {
<<<<<<< HEAD
    if (event && event.target && event.target.files && event.target.files.length===1) {
=======
    if (event && event.target && event.target.files && event.target.files.length==1) {
>>>>>>> main
      let file = event.target.files[0];
      mediaService.upload_image(file, (image_link) => {
        document.getElementById('img-preview').setAttribute('src', image_link)
        document.getElementById('img-preview').style.display = 'block';
        set_image_link(image_link)
      });
    } else {
      document.getElementById('img-preview').style.display = 'none';
      toast.error('Image upload failed. Try again.')
    }
  }

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 offset-lg-4 offset-md-3 px-5 py-3">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="image" bssize="large" className="my-4">
          <label className="form-label" for="formImage">Image</label>
          <input className="form-control " id="formImage" type="file" 
            onChange={e => image_changed(e)}/>
        </FormGroup>

        <img className="img-preview col-6 offset-3" src="" id="img-preview"></img>

        <FormGroup controlId="description" bssize="large" className="my-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control tai"
            value={description}
            onChange={e => set_description(e.target.value)
        }
          />
        </FormGroup>
        <Button className="my-2 w-100" block bssize="large" type="submit">
          Add post
        </Button>

      </form>
    </div>
  );
}
