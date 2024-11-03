import { loadToys } from "../store/actions/toy.actions.js"

export function HomePage() {
    // const toys = useSelector(storeState => storeState.toyModule.toys)

    loadToys()
        .catch(err => {
            showErrorMsg('Cannot load toys!')
        })

    return (
        <section>
            <h2 className="center">Toys Are US!</h2 >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eos odit minima, eaque tenetur atque ducimus facere quam. Incidunt odio quisquam ea fuga distinctio ipsum asperiores? Nostrum, ratione unde. Porro. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium at eius tempora dolorem, nisi culpa, saepe rem, quae nemo veniam itaque? Distinctio quidem labore, illum laudantium sit dolorum est consequuntur?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eos odit minima, eaque tenetur atque ducimus facere quam. Incidunt odio quisquam ea fuga distinctio ipsum asperiores? Nostrum, ratione unde. Porro.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eos odit minima, eaque tenetur atque ducimus facere quam. Incidunt odio quisquam ea fuga distinctio ipsum asperiores? Nostrum, ratione unde. Porro.</p>

        </section >
    )
}