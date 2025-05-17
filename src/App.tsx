import {Route, Routes} from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import AuthPage from "./pages/account/auth/AuthPage";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/account/auth'} element={<AuthPage/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;