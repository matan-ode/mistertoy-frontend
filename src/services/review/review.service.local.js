import { storageService } from '../async-storage.service'
import { toyService } from '../toy.service'
import { userService } from '../user'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	return storageService.query('review')
}

async function remove(reviewId) {
	await storageService.remove('review', reviewId)
}

async function add({ txt, userId }) {
	const toy = await toyService.getById(userId)
	const reviewToAdd = {
		txt,
		user: toyService.getLoggedinUser(),
		toy: {
			_id: toy._id,
			name: toy.name,
			// imgUrl: toy.imgUrl,
		},
	}

	// reviewToAdd.user.score += 10
	await toyService.update(reviewToAdd.user)

	const addedReview = await storageService.post('review', reviewToAdd)
	return addedReview
}