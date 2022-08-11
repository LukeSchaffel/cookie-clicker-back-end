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
  try {
  const profile = await Profile.findById(req.params.id)
  res.json(profile)
  } catch(error){
    console.log(error)
    throw error
  }
}

const addCookie = async ( req, res ) => {
  const profile = await Profile.findById(req.params.id)
  profile.cookies ++
  profile.save()
  res.json(profile)
}

const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    const { cookies, grandmas, cursors, farms, mines, factories, banks, temples } = req.body
    profile.cookies = cookies
    profile.cursors = cursors
    profile.farms = farms
    profile.mines = mines
    profile.factories = factories
    profile.banks = banks
    profile.temples = temples
    profile.save()
    res.json(profile)

  } catch (error){
    console.log(error);
    throw error
  }
 
}


export { index, addPhoto, getState, addCookie, updateProfile }
