import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.getState)
router.put('/:id/update', checkAuth, profilesCtrl.updateProfile)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
