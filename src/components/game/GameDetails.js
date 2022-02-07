import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createRating, deleteGame, getGame, getPicturesByGame, getReviewsByGame } from "./GameManager.js"

export const GameDetails = (props) => {
    const { gameId } = useParams()
    const gameDetailId = parseInt(gameId)
    const history = useHistory()
    const [game, setGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])
    const [pictures, setPictures] = useState([])
    const [rating, setRating] = useState(5)


    useEffect(() => {
        if (gameDetailId) {
            getGame(gameDetailId).then(setGame)
            getReviewsByGame(gameDetailId).then(setGameReviews)
            getPicturesByGame(gameDetailId).then(setPictures)
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

            <h3>Reviews</h3>
            {
                gameReviews.map(review => {
                    return <div className="reviewBox" key={review.id}>
                        {review.review}
                        <p>Submitted by {review.user.first_name} {review.user.last_name}</p>
                    </div>
                })
            }

            <button onClick={() => {
                history.push(`/games/${game.id}/review`)
            }}>Review</button>

            <h3>Pictures</h3>

            <div>
                {
                    pictures.map(picture => {
                        return <img className="gamePic" key={picture.id} src={`${picture.base64}`} alt={`Playing ${game.title}`}></img>
                    })
                }
            </div>

            <button onClick={() => {
                history.push(`/games/${game.id}/image`)
            }}>Upload image</button>

            <h3>Ratings</h3>

            <div>Average Rating: {game.average_rating}</div>

            <h4>Your Rating (1-10)</h4>
            <div className="slidecontainer">
                <input type="range" min="1" max="10" className="slider" id="myRange"
                    value={rating}
                    onChange={(evt) => {
                        setRating(evt.target.value)
                    }} />
                <div>{rating}</div>
            </div>

            <button onClick={(evt) => {
                createRating({ rating: rating, gameId: game.id })
                    .then(() => getGame(gameDetailId))
                    .then(setGame)
            }}>Submit Rating</button>
        </article>
    )
}