import App from '../App'
import Home from '../pages/home'
import About from '../pages/about'
import SignUp from '../pages/signup'
import SignIn from '../pages/signin'
import ErrorPage from '../pages/errorElement'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "signin", element: <SignIn /> },
            { path: "signup", element: <SignUp /> }
        ]
    }
]

export default routes;