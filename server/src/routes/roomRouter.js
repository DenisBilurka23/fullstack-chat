import { Router } from 'express'
import roomControllers from '../controllers/roomControllers.js'

const roomRouter = Router()

roomRouter.get('/:roomId', roomControllers.get)
roomRouter.delete('/', roomControllers.delete)
roomRouter.post('/', roomControllers.create)
roomRouter.post('/message', roomControllers.sendMessage)

export default roomRouter
