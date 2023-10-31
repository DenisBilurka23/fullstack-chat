import path from 'path'
import fs from 'fs'

export const transformImageFromName = name => {
	const imagePath = path.join(__basepath, 'uploads', name || '')
	let profilePicture = null
	if (name) {
		try {
			const imageBuffer = fs.readFileSync(imagePath)
			const fileExtension = path.extname(name).toLowerCase().replace('.', '')
			profilePicture = `data:image/${fileExtension};base64,${imageBuffer.toString('base64')}`
		} catch (error) {
			console.error('Error reading image file:', error)
		}
	}
	return profilePicture
}
