import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGames, getGamesByOrder, getGamesBySearch } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [orderByString, setOrderByString] = useState('')
    const history = useHistory()

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    useEffect(()=> {
        if(orderByString === "" && searchTerm ===""){
            getGames().then(setGames)
        } else if (orderByString !== ""){
            getGamesByOrder(orderByString).then(setGames)
        } else if (searchTerm !== ""){
            getGamesBySearch(searchTerm).then(setGames)
        }
    }, [orderByString, searchTerm])


    return (
        <article>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <input type="text" name="search" required autoFocus className="form-control"
                placeholder="Search games"
                value={searchTerm}
                onChange={(evt) => {
                    setOrderByString("")
                    setSearchTerm(evt.target.value)
                }}/>
            <fieldset>
                <div className="form-group">
                    <select type="number" name="orderBy" className="form-control"
                        value={orderByString}
                        onChange={(evt) => {
                            setSearchTerm("")
                            setOrderByString(evt.target.value)
                        }}>
                        <option value="">Order by:</option>
                        <option value="hours_playtime">Hours Playtime</option>
                        <option value="year_released">Year Released</option>
                        <option value="designer">Designer</option>
                    </select>
                </div>
            </fieldset>
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