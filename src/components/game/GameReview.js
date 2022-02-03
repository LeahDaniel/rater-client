import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createReview } from "./GameManager"


export const GameReview = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const reviewGameId = parseInt(gameId)
    const [review, setReview] = useState('')


    const submitReview = (evt) => {
        evt.preventDefault()

        createReview({ gameId: reviewGameId, review: review })
            .then(() => history.push(`/games/${reviewGameId}`))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Submit your review</h2>

            <fieldset>
                <div className="form-group">
                    <textarea type="textarea" name="review" className="form-control"
                        value={review}
                        onChange={(evt) => {setReview(evt.target.value)}}
                    ></textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={submitReview}
                className="btn btn-primary">Save
            </button>
        </form>
    )
}