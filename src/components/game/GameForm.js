import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createGame, getGame, getCategories, updateGame } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const editGameId = parseInt(gameId)
    const [categories, setCategories] = useState([])
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        yearReleased: 0,
        numberOfPlayers: 0,
        hoursPlaytime: 0,
        minAgeRecommended: 0,
        categoryId: 0
    })

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    useEffect(
        () => {
            if (editGameId) {
                getGame(editGameId)
                    .then((editGame) => {
                        setCurrentGame({
                            title: editGame.title,
                            description: editGame.description,
                            designer: editGame.designer,
                            yearReleased: editGame.year_released,
                            numberOfPlayers: editGame.number_of_players,
                            hoursPlaytime: editGame.hours_playtime,
                            minAgeRecommended: editGame.min_age_recommended,
                            categoryId: editGame.categories[0]?.id
                        })
                    })
            }
        }, [editGameId]
    )

    const changeGameState = (domEvent) => {
        const newEntry = Object.assign({}, currentGame)
        newEntry[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newEntry)
    }

    const submitGame = (evt) => {
        evt.preventDefault()

        const game = {
            title: currentGame.title,
            description: currentGame.description,
            designer: currentGame.designer,
            yearReleased: parseInt(currentGame.yearReleased),
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            hoursPlaytime: parseInt(currentGame.hoursPlaytime),
            minAgeRecommended: parseInt(currentGame.minAgeRecommended),
            categoryId: parseInt(currentGame.categoryId)
        }

        // Send POST request to your API
        if (editGameId) {
            updateGame(game, editGameId)
                .then(() => history.push(`/games/${editGameId}`))
        } else {
            createGame(game)
                .then(() => history.push("/games"))
        }
    }

    return (
        <form className="gameForm">
            {
                editGameId
                    ? <h2 className="gameForm__title">Edit Game</h2>
                    : <h2 className="gameForm__title">Register New Game</h2>
            }

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="textarea" name="description" className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="number" name="yearReleased" className="form-control"
                        value={currentGame.yearReleased}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hoursPlaytime">Playtime (hrs): </label>
                    <input type="number" name="hoursPlaytime" className="form-control"
                        value={currentGame.hoursPlaytime}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="minAgeRecommended">Min age recommended: </label>
                    <input type="number" name="minAgeRecommended" className="form-control"
                        value={currentGame.minAgeRecommended}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select type="number" name="categoryId" className="form-control"
                        value={currentGame.categoryId}
                        onChange={changeGameState}
                    >
                        <option value="0">Choose a category</option>
                        {
                            categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={submitGame}
                className="btn btn-primary">Save
            </button>
        </form>
    )
}