import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deleteGame, getGame, getGames, getReviewsByGame } from "./GameManager.js"

export const GameDetails = (props) => {
    const { gameId } = useParams()
    const gameDetailId = parseInt(gameId)
    const history = useHistory()
    const [game, setGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])

    useEffect(() => {
        getGame(gameDetailId).then(setGame)
        getReviewsByGame(gameDetailId).then(setGameReviews)
    }, [])

    return (
        <article className="games">
            <h2 className="game__title">{game.title} by {game.designer}</h2>
            <div className="game__description">{game.description}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__year">Released in {game.year_released}</div>
            <div className="game__time">Time to play (hrs): {game.hours_playtime}</div>
            <div className="game__age">Min age recommended: {game.min_age_recommended}</div>
            <h3>Reviews</h3>
            {
                gameReviews.map(review => {
                    return <div key={review.id}>
                        {review.review}
                        <p>Submitted by {review.user.first_name} {review.user.last_name}</p>
                    </div>
                })
            }
            <button onClick={() => {
                history.push({ pathname: `/games/edit/${game.id}` })
            }}>Edit</button>
            <button onClick={() => {
                deleteGame(game.id)
            }}>Delete</button>
            <button onClick={() => {
                history.push(`/games/${game.id}/review`)
            }}>Review</button>
        </article>
    )
}