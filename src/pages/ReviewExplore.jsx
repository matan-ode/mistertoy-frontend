import { useSelector } from "react-redux"
import { ReviewList } from "../cmps/ReviewList"
import { loadReviews } from "../store/actions/review.actions"
import { useEffect } from "react"


export function ReviewExplore() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    return (
        <ReviewList reviews={reviews} />
    )
}