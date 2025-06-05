import {Route, Routes} from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import AuthPage from "./pages/account/auth/AuthPage";
import CreateJournal from "./pages/journal/journalCreate/CreateJournal";
import ListJournal from "./pages/journal/journalList/ListJournal";
import Footer from './components/footer/Footer';

function App() {
    return (
        <div className="page-wrapper">
            <Header/>
            <main className="main-content">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/account/auth'} element={<AuthPage/>}/>
                    <Route path={'/create-trip'} element={<CreateJournal/>}/>
                    <Route path={'/list-journal'} element={<ListJournal/>}/>
                    <Route path={'/account/auth/:authMode'} element={<AuthPage/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default App;