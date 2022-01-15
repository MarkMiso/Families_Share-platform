const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')
const Address = require('../models/address')
const Group = require('../models/group')
const Image = require('../models/image')
const Member = require('../models/member')
const User = require('../models/user')
const Notification = require('../models/notification')
const Parent = require('../models/parent')
const Reply = require('../models/reply')
const Announcement = require('../models/announcement')
const Password_Reset = require('../models/password-reset')
const Device = require('../models/device')
const Rating = require('../models/rating')
const Community = require('../models/community')
const Child = require('../models/child')

router.get('/', (req, res, next) => {
  if (!req.user_id) { return res.status(401).send('Not authenticated') }
  const { ids } = req.query
  if (!ids) {
    return res.status(400).send('Bad Request')
  }
  Child.find({ child_id: { $in: ids } })
    .select('given_name family_name image_id child_id suspended')
    .populate('image')
    .lean()
    .exec()
    .then(profiles => {
      if (profiles.length === 0) {
        return res.status(404).send('Children not found')
      }
      res.json(profiles)
    }).catch(next)
})


router.post('/authenticate/email', async (req, res, next) => {
  const {
    email, password, deviceToken, language, origin, username
  } = req.body
  try {
    const user = await User.findOne({ email })
    const child_parent = await Child.findOne({ username })
    if (!user && !child_parent) {
      return res.status(401).send('Authentication failure')
    }
    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      return res.status(401).send('Authentication failure')
    }
    if (deviceToken !== 'undefined' && deviceToken !== undefined && deviceToken !== null){
      const device = await Device.findOne({ device_id: deviceToken })
      if (device) {
        device.user_id = user.user_id
        device.save()
      } else {
        await Device.create({
          user_id: user.user_id,
          device_id: deviceToken
        })
      }
    }
    const profile = await Profile.findOne({ user_id: user.user_id })
      .populate('image')
      .lean()
      .exec()
    if (profile.suspended) {
      await Profile.updateOne({ user_id: user.user_id }, { suspended: false })
      const usersChildren = await Parent.find({ parent_id: user.user_id })
      const childIds = usersChildren.map(usersChildren.child_id)
      await Child.updateMany({ child_id: { $in: childIds } }, { suspended: false })
    }
    const token = jwt.sign(
      { user_id: user.user_id, email },
      process.env.SERVER_SECRET
    )
    const response = {
      id: user.user_id,
      email,
      name: `${profile.given_name} ${profile.family_name}`,
      image: profile.image.path,
      token,
      role: user.role,
      child: child_parent,
    }
    user.last_login = new Date()
    user.language = language
    user.token = token
    if (origin === 'native') {
      user.version = req.body.version
    } else {
      user.version = 'latest'
    }
    await user.save()
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.post('/groups/:id', async (req, res, next) => {
  if (!req.user_id) { return res.status(401).send('Not authenticated') }
  const { id } = req.params 
  try{
    const { user_id } = req
    const parent = await Parent.findOne({ user_id })
    
  }catch{

  }

});


router.get('/:id/children', async (req, res, next) => {
  const { id } = req.params
  const members = await Member.find({ group_id: id, user_accepted: true, group_accepted: true }).distinct('user_id')
  const children = await Parent.find({ parent_id: { $in: members } }).distinct('child_id')
  if (children.length === 0) {
    return res.status(404).send('Group has no children')
  }
  return res.json([...new Set(children)])
})


router.get('/:id/children/', async (req, res, next) => {
  const { id } = req.params
  const members = await Member.find({ group_id: id, user_accepted: true, group_accepted: true }).distinct('user_id')
  const children = await Parent.find({ parent_id: { $in: members } }).distinct('child_id')
  if (children.length === 0) {
    return res.status(404).send('Group has no children')
  }
  return res.json([...new Set(children)])
})






module.exports = router
