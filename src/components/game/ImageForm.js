import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createPicture } from './GameManager.js'


export const ImageForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const imageGameId = parseInt(gameId)
    const [imageString, setImageString] = useState("")

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setImageString(base64ImageString)
        });
    }

    const submitPicture = (evt) => {
        evt.preventDefault()

        const picture = {
            gameId: imageGameId,
            file: imageString
        }

        // Send POST request to your API

        createPicture(picture)
            .then(() => history.push(`/games/${imageGameId}`))
    }

    return (
        <form>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={imageGameId} />
            <button onClick={submitPicture}>Upload</button>
        </form>
    )
}