
import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)


    return (
        <footer className='app-footer full'>
            <h5>
                Currently {toysLength} toys in the shop
            </h5>
            <p>
                Coffeerights
            </p>
            {/* <button className="btn btn-dark">Check mixin</button> */}
        </footer>
    )
}
