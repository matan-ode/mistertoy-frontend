import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { addReview } from "../store/actions/review.actions.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ReviewEdit({ toyId }) {
	const users = useSelector(storeState => storeState.userModule.users)
	const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
	const [reviewToEdit, setReviewToEdit] = useState({ txt: '', userId: loggedInUser._id || '' })


	useEffect(() => {
		setReviewToEdit(review => {
			review.userId = loggedInUser._id
			review.toyId = toyId
			review.txt = reviewToEdit.txt
			return review
		})
	}, [loggedInUser])

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewToEdit({ ...reviewToEdit, [name]: value })
	}

	async function onAddReview(ev) {
		ev.preventDefault()
		if (!reviewToEdit.txt || !reviewToEdit.userId) return alert('All fields are required')

		try {
			await addReview(reviewToEdit)
			showSuccessMsg('Review added')
			setReviewToEdit(preReview => ({...preReview , txt: ''}))
		} catch (err) {
			showErrorMsg('Cannot add review')
		}
	}
	console.log(reviewToEdit);

	return <form className="review-edit" onSubmit={onAddReview}>
		<textarea name="txt" onChange={handleChange} value={reviewToEdit.txt}></textarea>
		<button>Add</button>
	</form>

}