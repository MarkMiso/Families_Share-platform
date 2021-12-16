const express = require('express')
const router = new express.Router()

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
    username, password, language, origin
  } = req.body
  try {
    const child = await Child.findOne({ username })
    if (!child) {
      return res.status(401).send('Authentication failure')
    }
    const passwordMatch = await child.comparePassword(password)
    if (!passwordMatch) {
      return res.status(401).send('Authentication failure')
    }

    if (profile.suspended) {
        const response = {
          message: "Account sospeso"
        }
        res.json(response)
    }else{
      console.log("ok")
      const response = {
        id: child.child_id,
        username,
        given_name: `${profile.given_name} ${profile.family_name}`,
        image: child.image.path,
        token,
        role: 'child'
      }
      child.last_login = new Date()
      child.token = token
      if (origin === 'native') {
        child.version = req.body.version
      } else {
        child.version = 'latest'
      }
      await child.save()
      res.json(response)
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router
