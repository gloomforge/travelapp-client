import './Home.css'
import FirstSection from "./components/FirstSection";
import SecondSection from "./components/SecondSection";

function Home() {
    return (
        <div className={'home-container'}>
            <FirstSection/>
            <SecondSection/>
        </div>
    );
}

export default Home;