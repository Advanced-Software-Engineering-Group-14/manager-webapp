import { State, Action } from "@/src/types";

const actionTypes = {
    SET_USER: "SET_USER",
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            }
    }
}

export default reducer