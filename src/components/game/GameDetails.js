import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createRating, deleteGame, getGame, getReviewsByGame } from "./GameManager.js"

export const GameDetails = (props) => {
    const { gameId } = useParams()
    const gameDetailId = parseInt(gameId)
    const history = useHistory()
    const [game, setGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])
    const [rating, setRating] = useState(5)

    useEffect(() => {
        if (gameDetailId) {
            getGame(gameDetailId).then(setGame)
            getReviewsByGame(gameDetailId).then(setGameReviews)
        }
    }, [gameDetailId])


    return (
        <article className="games">
            <h2 className="game__title">{game.title} by {game.designer}</h2>
            <div className="game__description">{game.description}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__year">Released in {game.year_released}</div>
            <div className="game__time">Time to play (hrs): {game.hours_playtime}</div>
            <div className="game__age">Min age recommended: {game.min_age_recommended}</div>
            <div>Average Rating: {game.average_rating}</div>
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
                history.push(`/games/${game.id}/review`)
            }}>Review</button>


            {
                game.user?.id === parseInt(localStorage.getItem("userId"))
                    ? <div>
                        <button onClick={() => {
                            history.push({ pathname: `/games/${game.id}/edit` })
                        }}>Edit</button>
                        <button onClick={() => {
                            deleteGame(game.id)
                        }}>Delete</button>
                    </div>
                    : ""
            }

                <div>Your Rating (1-10)</div>
            <div className="slidecontainer">
                <input type="range" min="1" max="10" className="slider" id="myRange"
                    value={rating}
                    onChange={(evt) => {
                        setRating(evt.target.value)
                    }} />
                <div>{rating}</div>
            </div>
            <button onClick={(evt) => {
                createRating({rating: rating, gameId: game.id})
                    .then(() => getGame(gameDetailId))
                    .then(setGame)
            }}>Submit Rating</button>
        </article>
    )
}