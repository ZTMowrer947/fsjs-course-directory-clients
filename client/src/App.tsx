import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingIndicator from "./components/LoadingIndicator";
import AuthContext from "./context/AuthContext";
import AuthState from "./models/AuthState";
import User from "./models/User";
import UserService from "./services/User.service";
import "./App.scss";

// Async Components
const Courses = React.lazy(() => import("./components/pages/Courses"));
const CourseDetail = React.lazy(() =>
    import("./components/pages/CourseDetail")
);
const UserSignIn = React.lazy(() => import("./components/pages/UserSignIn"));
const UserSignUp = React.lazy(() => import("./components/pages/UserSignUp"));
const UserSignOut = React.lazy(() => import("./components/pages/UserSignOut"));

const App: React.FC = () => {
    // Initialize state
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    // Construct signIn and signOut callback
    const signIn = useCallback(
        async (emailAddress: string, password: string) => {
            // Attempt to sign in user
            const authUser = await UserService.signIn(emailAddress, password);

            // Set user state
            setUser(authUser);
        },
        [setUser]
    );

    const signOut = useCallback(() => {
        // Sign out user
        UserService.signOut();

        // Clear user state
        setUser(undefined);
    }, [setUser]);

    // Construct AuthState
    const authState = useMemo<AuthState>(
        () => ({
            user,
            loading,
            getCredentials: UserService.getCredentials,
            signIn,
            signUp: UserService.signUp,
            signOut,
        }),
        [signIn, signOut, user, loading]
    );

    useEffect(() => {
        // Attempt to get credentials from cookie data
        const credentials = authState.getCredentials();

        // If there are persisted credentials, but the user hasn't been signed in,
        // and we are not currently loading,
        if (!!credentials && !user && !loading) {
            // Decode credentials
            const decodedCredentials = atob(credentials);
            const [emailAddress, password] = decodedCredentials.split(":");

            // Sign in user
            authState
                .signIn(emailAddress, password)
                .catch(() => {
                    // If credentials were invalid, sign out user
                    authState.signOut();
                })
                .finally(() => {
                    // In any case, unset loading flag
                    setLoading(false);
                });
        } else {
            // Otherwise, just unset loading flag
            setLoading(false);
        }
    }, [authState, user, loading]);

    return (
        <AuthContext.Provider value={authState}>
            <Layout>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <React.Suspense fallback={<LoadingIndicator />}>
                        <Switch>
                            <Redirect from="/" to="/courses" exact />
                            <Route path="/courses" exact component={Courses} />
                            <Route
                                path="/courses/:id"
                                exact
                                component={CourseDetail}
                            />
                            <Route path="/signin" component={UserSignIn} />
                            <Route path="/signup" component={UserSignUp} />
                            <Route path="/signout" component={UserSignOut} />
                        </Switch>
                    </React.Suspense>
                )}
            </Layout>
        </AuthContext.Provider>
    );
};

export default App;
