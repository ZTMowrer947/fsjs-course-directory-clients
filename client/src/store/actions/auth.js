// Action Types
export const types = {
    SIGN_IN_START: "SIGN_IN_START",
    SIGN_IN_DONE: "SIGN_IN_DONE",
    SIGN_OUT: "SIGN_OUT",
    RESET_SIGN_IN_FLAG: "RESET_SIGN_IN_FLAG",
};

// Action Creators
export const signInStart = (emailAddress, password, prevUrl) => ({
    type: types.SIGN_IN_START,
    payload: {
        emailAddress,
        password,
        prevUrl,
    },
});

export const signInDone = (user, credentials, error = undefined) => ({
    type: types.SIGN_IN_DONE,
    error: error !== undefined,
    payload: error !== undefined ? error : {
        user,
        credentials,
    },
});

export const signOut = () => ({ type: types.SIGN_OUT });

export const resetSignInFlag = () => ({ type: types.RESET_SIGN_IN_FLAG })
