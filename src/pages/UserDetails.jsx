import { useParams } from "react-router-dom";
import { ReviewList } from "../cmps/ReviewList";
import { useSelector } from "react-redux";
import { loadReviews } from "../store/actions/review.actions";
import { useEffect } from "react";

export function UserDetails() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const { userId } = useParams()

    useEffect(() => {
        loadReviews()
    }, [])

    return (
        <ReviewList reviews={reviews} userId={userId} />
    )
}