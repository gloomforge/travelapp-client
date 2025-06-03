import './FirstSection.css';

const FirstSection = () => {
    return (
        <section className="welcome-cards">
            <div className="welcome-cards-left">
                <h1>Start your online travel journal</h1>
                <p>
                    Capture every moment of your journey, from breathtaking sunsets to bustling city streets, and
                    seamlessly weave them into a personalized online travel journal.
                </p>
                <button className="welcome-cards-left__button">
                    Start your journal now <span className="arrow">→</span>
                </button>
            </div>
            <div className="welcome-cards-right">
                <img src="/images/first-section-card.jpg" alt="App preview" />
            </div>
        </section>
    );
};

export default FirstSection;
