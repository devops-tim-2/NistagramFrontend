import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import userService from '../Services/userService';
import { useHistory } from "react-router-dom";
import toast from "../Shared/Toast";

import Select from 'react-select'


import {Link} from 'react-router-dom';
import { api } from "../Environment/environment";

export default function Login() {
  let history = useHistory()
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [role, set_role] = useState("")
  const [age, set_age] = useState("")
  const [sex, set_sex] = useState("")
  const [region, set_region] = useState("")
  const [interests, set_interests] = useState("")
  const [bio, set_bio] = useState("")
  const [website, set_website] = useState("")
  const [phone, set_phone] = useState("")
  const [mail, set_mail] = useState("")
  const [profile_image_link, set_profile_image_link] = useState("")
  const [publicc, set_publicc] = useState("")
  const [taggable, set_taggable] = useState("")
  
  const all_interests = ['Writing', 'Gardening', 'Calligraphy', 'Puzzling', 'Reading', 'Cooking ', 'Running', 'Rock Climbing', 'Swimming', 'Yoga', 'Hiking', 'Brew Your Own Beer', 'Beekeeping', 'Stand-Up Comedy and Improv', 'Pickling', 'Mixology', 'Start a Collection', 'Painting', 'Scrapbooking', 'Knitting', 'Pottery', 'Sewing', 'Embroidery', 'Make Your Own Candles', 'Meditation', 'Traveling', 'Learn an Instrument', 'Photography', 'Study New Languages', 'Volunteer']
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let user_object = {
      'username': username,
      'password': password,
      'role': role,
      'age': age,
      'sex': sex,
      'region': region,
      'interests': (interests&&interests.length > 0)?interests.join(', '):'',
      'bio': bio,
      'website': website,
      'phone': phone,
      'mail': mail,
      'profile_image_link': profile_image_link,
      'public': publicc === 'publicc',
      'taggable': taggable === 'true'
    }

    userService.register(user_object).then((response) => {
      toast.success("Successfully registered.")
    }).catch(error => {
      toast.error(JSON.stringify(error.message, null, 2))
    })

  }


  function handleInterestChange (event) {
    let x = event?event.map(e => e.value):[];
    set_interests(x)
  }

  function image_changed(event) {
    if (event && event.target && event.target.files && event.target.files.length==1) {
      let file = event.target.files[0];
      let req = new XMLHttpRequest();
      let formData = new FormData();
      formData.append("image", file);   
      req.open("POST", `${api}media/`);

      req.onload = function () {
        if (this.status == 200) {
          set_profile_image_link(`${api}/media/${JSON.parse(req.response).image_path}`);
          document.getElementById('img-preview').setAttribute('src', `${api}media/${JSON.parse(req.response).image_path}`)
          document.getElementById('img-preview').style.display = 'block';
        } else {
          req.onerror = function () {
            toast.error('Image upload failed. Try again.')
          }
        }
      }

      req.onerror = function () {
        toast.error('Image upload failed. Try again.')
      }

      req.send(formData);

    } else {
      toast.error('Image upload failed. Try again.')
    }
  }


  return (
    <div className="Login col-lg-4 col-md-6 col-sm-12 offset-lg-4 offset-md-3 px-5 py-3">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bssize="large" className="my-4">
          <label>Username</label>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => set_username(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large" className="my-4">
          <label>Password</label>
          <FormControl
            value={password}
            onChange={e => set_password(e.target.value)}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="role" bssize="large" className="my-4" id="roleSelect" onChange={e => set_role(e.target.value)}>
            <label>Role</label>
            <FormControl as="select">
                <option value=''></option>
                <option value='user'>User</option>
                <option value='agent'>Agent</option>
            </FormControl>
        </FormGroup>

        <FormGroup controlId="age" bssize="large" className="my-4">
            <label>Age</label>
            <FormControl
                value={age}
                onChange={e => set_age(e.target.value)}
                type="number"
            />
        </FormGroup>

        <FormGroup controlId="sex" bssize="large" className="my-4" id="sexSelect" onChange={e => set_sex(e.target.value)}>
            <label>Sex</label>
            <FormControl as="select">
                <option value=''></option>
                <option value='m'>Male</option>
                <option value='f'>Female</option>
                <option value='o'>Other</option>
            </FormControl>
        </FormGroup>

        <FormGroup controlId="region" bssize="large" className="my-4" id="regionSelect" onChange={e => set_region(e.target.value)}>
            <label>Region</label>
            <FormControl as="select">
                <option value=''></option>
                <option value='eu'>Europe</option>
                <option value='na'>North America</option>
                <option value='sa'>South America</option>
                <option value='af'>Africa</option>
                <option value='as'>Asia</option>
                <option value='au'>Australia</option>
            </FormControl>
        </FormGroup>

        <div className="form-group">
            <label htmlFor="interests">Interests</label>
            <br></br>
            <Select
              isMulti
              name="interests"
              options={all_interests.map((interest)=> { return {value: interest.toLowerCase(), label: interest}})}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleInterestChange}
            />
          </div>


        <FormGroup controlId="bio" bssize="large" className="my-4">
            <label>Bio</label>
            <FormControl
                value={bio}
                onChange={e => set_bio(e.target.value)}
                type="text"
            />
        </FormGroup>

        <FormGroup controlId="website" bssize="large" className="my-4">
            <label>Website</label>
            <FormControl
                value={website}
                onChange={e => set_website(e.target.value)}
                type="text"
            />
        </FormGroup>

        <FormGroup controlId="phone" bssize="large" className="my-4">
            <label>Phone</label>
            <FormControl
                value={phone}
                onChange={e => set_phone(e.target.value)}
                type="text"
            />
        </FormGroup>

        <FormGroup controlId="mail" bssize="large" className="my-4">
            <label>E-mail</label>
            <FormControl
                value={mail}
                onChange={e => set_mail(e.target.value)}
                type="text"
            />
        </FormGroup>
        
        <FormGroup controlId="image" bssize="large" className="my-4">
          <label className="form-label" for="formImage">Image</label>
          <input className="form-control " id="formImage" type="file" 
            onChange={e => image_changed(e)}/>
        </FormGroup>

        <img className="img-preview col-6 offset-3" src="" id="img-preview"></img>


        <FormGroup controlId="publicc" bssize="large" className="my-4" id="publiccSelect" onChange={e => set_publicc(e.target.value)}>
            <label>Account type</label>
            <FormControl as="select">
                <option value=''></option>
                <option value='publicc'>Public</option>
                <option value='private'>Private</option>
            </FormControl>
        </FormGroup>
        <FormGroup controlId="taggable" bssize="large" className="my-4" id="taggableSelect" onChange={e => set_taggable(e.target.value)}>
            <label>Tags</label>
            <FormControl as="select">
                <option value=''></option>
                <option value='true'>Others can tag me on their posts</option>
                <option value='false'>Others cannot tag me on their posts</option>
            </FormControl>
        </FormGroup>

        <Button className="my-2 w-100" block bssize="large" disabled={!validateForm()} type="submit">
          Create account
        </Button>

        <br></br>
        <br></br>
        <Link to="/login" className="my-5">Already have an account?</Link>
      </form>
    </div>
  );
}
