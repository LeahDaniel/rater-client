import React from "react"
import { Route } from "react-router-dom"
import { GameDetails } from "./game/GameDetails"
import { GameList } from "./game/GameList"

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
        </main>
    </>
}

