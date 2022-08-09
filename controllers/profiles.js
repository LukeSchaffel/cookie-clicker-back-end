import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

const getState = async (req, res) => {
  const profile = await Profile.findById(req.params.id)
  res.json(profile)
}

const addCookie = async ( req, res ) => {
  const profile = await Profile.findById(req.params.id)
  profile.cookies ++
  profile.save()
  res.json(profile)
}

export { index, addPhoto, getState, addCookie }
