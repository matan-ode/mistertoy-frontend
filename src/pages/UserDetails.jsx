import { useParams } from "react-router-dom";
import { ReviewList } from "../cmps/ReviewList";
import { useSelector } from "react-redux";

export function UserDetails() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const { userId } = useParams()
    return (
        <ReviewList reviews={reviews} userId={userId} />
    )
}