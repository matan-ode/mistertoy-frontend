import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { user, toy } = review
    console.log(toy._id)

    return (
    <article className="preview review-preview">
        <p>About: <Link to={`/user/${toy._id}`}>{toy.name}</Link></p>
        <p className="review-by">By: <Link to={`/user/${user._id}`}>{user.nickname || user.fullname}</Link></p>
        <pre className="review-txt">{review.content}</pre>
        {review.createdAt &&
            <section className='created-at'>
                <h4>Created At:</h4>
                {new Date(review.createdAt).toLocaleString('he')}
            </section>
        }
    </article>)
}