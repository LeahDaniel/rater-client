import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGames, getGamesBySearch } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    return (
        <article>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <input type="text" name="search" required autoFocus className="form-control"
                placeholder="Search games"
                onKeyUp={(event) => {
                    if (event.key === "Enter") {
                        if (searchTerm === "") {
                            getGames().then(setGames)
                        } else {
                            getGamesBySearch(searchTerm)
                                .then(setGames)
                        }
                    } else {
                        setSearchTerm(event.target.value)
                    }
                }}
            />
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