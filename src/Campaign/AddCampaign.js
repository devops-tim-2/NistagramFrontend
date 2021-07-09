import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import toast from "../Shared/Toast";

import Select from 'react-select'
import mediaService from '../Services/mediaService'
import campaignService from '../Services/campaignService'

export default function AddCampaign() {
  let history = useHistory()
  const [description, set_description] = useState("");
  const [image_link, set_image_link] = useState("");
  const [times, set_times] = useState("");
  const [startdate, set_startdate] = useState("");
  const [enddate, set_enddate] = useState("");
  const [age_min, set_age_min] = useState("");
  const [age_max, set_age_max] = useState("");
  const [regions, set_regions] = useState("");
  const [interests, set_interests] = useState("");
  const [sex, set_sex] = useState("");

  const all_interests = ['Writing', 'Gardening', 'Calligraphy', 'Puzzling', 'Reading', 'Cooking ', 'Running', 'Rock Climbing', 'Swimming', 'Yoga', 'Hiking', 'Brew Your Own Beer', 'Beekeeping', 'Stand-Up Comedy and Improv', 'Pickling', 'Mixology', 'Start a Collection', 'Painting', 'Scrapbooking', 'Knitting', 'Pottery', 'Sewing', 'Embroidery', 'Make Your Own Candles', 'Meditation', 'Traveling', 'Learn an Instrument', 'Photography', 'Study New Languages', 'Volunteer']
  const all_regions = ['eu','na','sa','af','as','au']
  const all_sexes = ['M', "F", "O"]
  function handleSubmit(event) {
    event.preventDefault();
    debugger;
    let d1 = new Date(`${startdate} 00:00`).getTime()
    let d2 = new Date(`${enddate} 23:59`).getTime()
    let razlika = d2-d1
    let broj_dana = Math.ceil(razlika/(1000*60*60*24))
    let uk_bro_puta = times * broj_dana;
    let unix_times = [...Array(uk_bro_puta)].map((put, ind) => d1 + ind*(razlika/uk_bro_puta));
    unix_times.push(new Date().getTime() + 1000*60)
    let obj = {
      'description': description,
      'image_url': image_link,
      'age_min': age_min,
      'age_max': age_max,
      'regions': (regions&&regions.length > 0)?regions.join(', '):'',
      'interests': (interests&&interests.length > 0)?interests.join(', '):'',
      'sex': (sex&&sex.length > 0)?sex.join(', '):'',
      'times': unix_times
    }
    campaignService.create(obj).then(response => {
        toast.success('Campaign created')
    }).catch(error => {
        toast.error('Create campaign failed. Try again.')
    })
  }

  function handleInterestChange (event) {
    let x = event?event.map(e => e.value):[];
    set_interests(x)
  }

  function handleRegionChange (event) {
    let x = event?event.map(e => e.value):[];
    set_regions(x)
  }

  function transgender (event) {
    let x = event?event.map(e => e.value):[];
    set_sex(x)
  }

  function image_changed(event) {
    if (event && event.target && event.target.files && event.target.files.length===1) {
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

  return (!localStorage.getItem('identity')?(<h1>Unavailable</h1>):(JSON.parse(localStorage.getItem('identity')).role === 'agent')?(
    <div className="col-lg-4 col-md-6 col-sm-12 offset-lg-4 offset-md-3 px-5 py-3">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="image" bssize="large" className="my-4">
          <label className="form-label">Image</label>
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



        <FormGroup controlId="startdate" bssize="large" className="my-4">
            <label>Start date</label>
            <br></br>
            <FormControl
              type="date"
              value={startdate}
              onChange={e => set_startdate(e.target.value)}
            />
            </FormGroup>


            <FormGroup controlId="enddate" bssize="large" className="my-4">
            <label>End date</label>
            <br></br>
            <FormControl
              type="date"
              value={enddate}
              onChange={e => set_enddate(e.target.value)}
            />
            </FormGroup>


          <FormGroup controlId="times" bssize="large" className="my-4">
            <label>How many times per day</label>
            <br></br>
            <FormControl
              type="number"
              value={times}
              onChange={e => set_times(e.target.value)}
            />
            </FormGroup>
        <FormGroup controlId="agemin" bssize="large" className="my-4">
          <label>Age min</label>
          <FormControl
            type="number"
            value={age_min}
            onChange={e => set_age_min(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="agemax" bssize="large" className="my-4">
          <label>Age max</label>
          <FormControl
            type="number"
            value={age_max}
            onChange={e => set_age_max(e.target.value)}
          />
        </FormGroup>

        
        <div className="form-group my-4">
            <label>Interests</label>
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

        <div className="form-group my-4">
            <label>Regions</label>
            <br></br>
            <Select
              isMulti
              name="regions"
              options={all_regions.map((region)=> { return {value: region.toLowerCase(), label: region}})}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleRegionChange}
            />
          </div>

        <div className="form-group my-4">
            <label>Sex</label>
            <br></br>
            <Select
              isMulti
              name="sex"
              options={all_sexes.map((sex)=> { return {value: sex.toLowerCase(), label: sex}})}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={transgender}
            />
          </div>

        <Button className="my-2 w-100 mb-5" block bssize="large" type="submit">
          Add post
        </Button>

      </form>
    </div>
  ):(<h1>You gotta be admin bro!</h1>));
}
