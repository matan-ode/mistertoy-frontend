import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { addReview } from '../store/actions/review.actions'


export function ChatRoom({handleMsgChange, onSaveMsg, msg, setMsg, toyId }) {

    const [topic, setTopic] = useState(toyId)
    // const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, onSaveMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, onSaveMsg)
        }
    }, [addMsg])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        addReview(newMsg)
        
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { userId: loggedInUser._id, toyId, from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleMsgChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>

        </section>

    )
}