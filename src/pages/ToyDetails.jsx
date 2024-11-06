import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useSelector } from "react-redux"
import { ReviewEdit } from "../cmps/ReviewEdit.jsx"
import { addReview, loadReviews } from "../store/actions/review.actions.js"
import { ReviewList } from "../cmps/ReviewList.jsx"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [reviewToEdit, setReviewToEdit] = useState({txt:''})

    const [msg, setMsg] = useState(toyService.getEmptyMsg())
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
        loadReviews()
    }, [toyId, reviewToEdit])

    async function loadToy() {
        // toyService.getById(toyId)
        //     .then(toy => setToy(toy))
        //     .catch(err => {
        //         console.log('Had issues in toy details', err)
        //         navigate('/toy')
        //     })
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }

    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(toyService.getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
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

    const { txt } = msg


    if (!toy) return <div>Loading...</div>
    console.log(toy.msgs);

    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Button variant="contained"><Link to={`/toy/edit/${toy._id}`}>Edit</Link></Button> &nbsp;
            <Button variant="contained"><Link to={`/toy`}>Back</Link></Button>
            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
            <ul className="toy-msgs">
                {toy.msgs ? toy.msgs.map((msg) => (
                    <li key={msg.id} className="toy-comment">
                        <div>{msg.txt ? msg.txt : 'No comments'}</div>
                        <div>By: {msg.by.fullname ? msg.by.fullname : ''}</div>
                        {loggedInUser.isAdmin ?
                            <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                                X
                            </button>
                            : ''}
                    </li>
                )) : ''}
            </ul>
            <form className="login-form" onSubmit={onSaveMsg}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Enter msg"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form>
            <div className="review-index">
                <h2>Reviews and Gossip</h2>
                {loggedInUser && <ReviewEdit reviewToEdit={reviewToEdit} setReviewToEdit={setReviewToEdit} onAddReview={onAddReview} toyId={toyId} />}
                <ReviewList
                    reviews={reviews}
                    toyId={toyId}
                  />
            </div>
            {/* <ReviewEdit toyId={toyId} /> */}
        </section>
    )
}