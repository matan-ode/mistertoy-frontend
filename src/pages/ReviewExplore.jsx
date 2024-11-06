import { useSelector } from "react-redux"
import { ReviewList } from "../cmps/ReviewList"


export function ReviewExplore() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    return (
        <ReviewList reviews={reviews} />
    )
}