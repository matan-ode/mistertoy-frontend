import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview-card">
            <h4>{toy.name}</h4>
            <h1>MISTER-TOYS</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Labels: <span>{toy.labels.join(', ').toLocaleString()}</span></p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}