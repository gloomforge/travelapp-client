import {Route, Routes} from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;