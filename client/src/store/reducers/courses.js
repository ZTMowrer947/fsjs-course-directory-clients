// Imports
import { types } from "../actions/courses";

// Reducer
export default function courses(state, action) {
    // Consider action type
    switch (action.type) {
        // Starting course list fetch
        case types.COURSES_FETCH_START:
            // Clear error and set fetching flag
            return {
                ...state,
                error: null,
                isFetching: true,
            };

        // Finished course list fetch
        case types.COURSES_FETCH_DONE:
            // If the action contains an error,
            if (action.error) {
                // Add it to state
                return {
                    ...state,
                    error: action.payload,
                    isFetching: false,
                };
            } else {
                // Otherwise, add course listing to state
                return {
                    ...state,
                    data: action.payload,
                    isFetching: false,
                };
            }

        // Unrecognized action type
        default:
            // Return state as-is
            return state;
    }
}
