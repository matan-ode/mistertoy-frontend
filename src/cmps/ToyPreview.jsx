import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <article className="toy-preview-card">
            <h4>{toy.name}</h4>
            <h1>MISTER-TOYS</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Labels: <span>{Array.isArray(toy.labels) ? toy.labels.join(', ').toLocaleString() : toy.labels.toLocaleString()}</span></p>
            <hr />
            {loggedInUser.isAdmin ?
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                :
                ''}
            <Link to={`/toy/${toy._id}`}>Details</Link>


        </article>
    )
}