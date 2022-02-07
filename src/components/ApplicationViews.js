import React from "react"
import { Route } from "react-router-dom"
import { GameDetails } from "./game/GameDetails"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { GameReview } from "./game/GameReview"
import { ImageForm } from "./game/ImageForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <GameReview />
            </Route>
            <Route exact path="/games/:gameId(\d+)/edit">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/image">
                <ImageForm />
            </Route>
        </main>
    </>
}

