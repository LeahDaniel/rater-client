import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    return (
        <article>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`}>
                        <Link className="nav-link" to={`/games/${game.id}`}>{game.title}</Link>
                    </section>
                })
            }
        </article>
    )
}