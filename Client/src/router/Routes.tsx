import { createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import RegisterForm from "../features/registration/RegisterForm";
import LoginForm from "../features/login/LoginForm";
import Member from "../features/memebers/Members";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog/> },
            { path: 'catalog/:Id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage/> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'login', element: <LoginForm />},
            { path: 'member', element: <Member/> },
        ]
    }
])