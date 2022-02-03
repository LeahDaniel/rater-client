export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`
        }
    })
        .then(response => response.json())
}
export const getGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}

export const updateGame = (game, id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    })
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteGame = gameId => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rater_token")}`
        },
    }).then(getGames)
};