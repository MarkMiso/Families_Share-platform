const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const childSchema = new mongoose.Schema(
  {
    child_id: {
      type: String,
      unique: true,
      required: true
    },
    given_name: {
      type: String,
      required: true
    },
    username:{
      type:String,
      unique: true
    },
    password:{
      type:String,
      minLength: 0
    },
    family_name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    image_id: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    suspended: {
      type: Boolean,
      required: true
    },
    isAccount:{
      type: Boolean,
    },
    deviceToken:{
      type: String,
    },
    token:{
      type: String,
    },
    deviceToken:{
      type: String,
    },
    allergies: String,
    special_needs: String,
    other_info: String,
    last_login: Date,
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

childSchema.virtual('image', {
  ref: 'Image',
  localField: 'image_id',
  foreignField: 'image_id',
  justOne: true
})

childSchema.post('find', (profiles, next) => {
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].suspended) {
      if (profiles[i].image !== null) {
        profiles[i].image.path = '/images/profiles/user_default_photo.png'
        profiles[i].image.thumbnail_path =
          '/images/profiles/user_default_photo.png'
      }
    }
  }
  next()
})
childSchema.post('findOne', (profile, next) => {
  if (profile !== null) {
    if (profile.suspended) {
      if (profile.image !== null) {
        profile.image.path = '/images/profiles/user_default_photo.png'
        profile.image.thumbnail_path =
          '/images/profiles/user_default_photo.png'
      }
    }
  }
  next()
})

childSchema.pre('save', function (next) {
  const child = this
  console.log(child)
  if (!child.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(child.password, salt, (err, hash) => {
      if (err) return next(err)
      child.password = hash
      next()
    })
  })
})

childSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

mongoose.pluralize(null)
const model = mongoose.model('Child', childSchema)

module.exports = model
