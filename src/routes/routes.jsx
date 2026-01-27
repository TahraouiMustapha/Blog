import App from '../App'
import Home from '../pages/home'
import About from '../pages/about'
import SignUp from '../pages/signup'
import ErrorPage from '../pages/errorElement'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "signup", element: <SignUp /> }
            // still sign in page
        ]
    }
]

export default routes;