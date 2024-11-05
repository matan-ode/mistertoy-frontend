
import { useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { ReviewPreview } from './ReviewPreview.jsx'
import { loadReviews } from '../store/actions/review.actions.js'

export function ReviewList({ reviews, toyId }) {

    // function shouldShowActionBtns(review) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return review.byUser?._id === user._id
    // }
    console.log(reviews);
    
    return (
        <>
            {toyId ?
                <section>
                    <ul className="list review-list">
                        {reviews.map(review =>
                            review.toy._id === toyId ?
                                <li key={review._id}>
                                    <ReviewPreview review={review} />
                                </li> : '')}
                    </ul>
                </section>
                : <section>
                    <ul className="list review-list">
                        {reviews.map(review =>
                            <li key={review._id}>
                                <ReviewPreview review={review} />
                            </li>)
                        }
                    </ul>
                </section>}
        </>
    )
}