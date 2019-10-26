import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingIndicator from "./components/LoadingIndicator";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./context/AuthContext";
import AuthState from "./models/AuthState";
import UserService from "./services/User.service";
import "./App.scss";

// Dynamically Imported Components
const Courses = React.lazy(() => import("./components/pages/Courses"));
const CourseDetail = React.lazy(() =>
    import("./components/pages/CourseDetail")
);
const CreateCourse = React.lazy(() =>
    import("./components/pages/CreateCourse")
);
const UserSignIn = React.lazy(() => import("./components/pages/UserSignIn"));
const UserSignUp = React.lazy(() => import("./components/pages/UserSignUp"));
const UserSignOut = React.lazy(() => import("./components/pages/UserSignOut"));

// State type
interface AppState {
    readonly auth: Readonly<AuthState>;
}

// Component
class App extends React.Component<{}, AppState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            auth: {
                loading: true,
                user: undefined,
                getCredentials: UserService.getCredentials,
                signIn: this.signIn.bind(this),
                signUp: UserService.signUp,
                signOut: this.signOut.bind(this),
            },
        };
    }

    public async signIn(emailAddress: string, password: string): Promise<void> {
        // Sign in user
        const user = await UserService.signIn(emailAddress, password);

        // Attach user to state
        this.setState(prevState => ({
            ...prevState,
            auth: {
                ...prevState.auth,
                user,
            },
        }));
    }

    public signOut(): void {
        // Sign out user
        UserService.signOut();

        // Remove user from state
        this.setState(prevState => ({
            ...prevState,
            auth: {
                ...prevState.auth,
                user: undefined,
            },
        }));
    }

    public componentDidMount() {
        // Attempt to get credentials from cookie data
        const credentials = this.state.auth.getCredentials();

        // Get user from auth state
        const user = this.state.auth.user;

        // If credentials are present, but the user data is not,
        if (!!credentials && !user) {
            // Decode credentials
            const decodedCredentials = atob(credentials);
            const [emailAddress, password] = decodedCredentials.split(":");

            // Sign in user
            this.state.auth
                .signIn(emailAddress, password)
                .catch(() => {
                    // If credentials were invalid, sign out user
                    this.state.auth.signOut();
                })
                .finally(() => {
                    // Whether successful or not, unset loading flag
                    this.setState(prevState => ({
                        ...prevState,
                        auth: {
                            ...prevState.auth,
                            loading: false,
                        },
                    }));
                });
        } else {
            // Otherwise, unset loading flag
            this.setState(prevState => ({
                ...prevState,
                auth: {
                    ...prevState.auth,
                    loading: false,
                },
            }));
        }
    }

    public render() {
        return (
            <AuthContext.Provider value={this.state.auth}>
                <Layout>
                    {this.state.auth.loading ? (
                        <LoadingIndicator />
                    ) : (
                        <React.Suspense fallback={<LoadingIndicator />}>
                            <Switch>
                                <Redirect from="/" to="/courses" exact />
                                <Route
                                    path="/courses"
                                    exact
                                    component={Courses}
                                />
                                <PrivateRoute
                                    path="/courses/create"
                                    exact
                                    component={CreateCourse}
                                />
                                <Route
                                    path="/courses/:id"
                                    exact
                                    component={CourseDetail}
                                />
                                <Route path="/signin" component={UserSignIn} />
                                <Route path="/signup" component={UserSignUp} />
                                <Route
                                    path="/signout"
                                    component={UserSignOut}
                                />
                            </Switch>
                        </React.Suspense>
                    )}
                </Layout>
            </AuthContext.Provider>
        );
    }
}

// Export
export default App;
