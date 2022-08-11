import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  photo: { type: String },
  cookies: { type: Number, default: 0},
  cursors: { type: Number, default: 0},
  grandmas: { type: Number, default: 0},
  farms: { type: Number, default: 0},
  mines: { type: Number, default: 0},
  factories: { type: Number, default: 0},
  banks: { type: Number, default: 0},
  temples: { type: Number, default: 0},
  upgrades: []
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
