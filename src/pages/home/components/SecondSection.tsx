import "./SecondSection.css";

type CardContainerProps = {
    image: string;
    reverse?: boolean;
    subtitle: string;
    title: string;
    list?: string[];
    description?: string[];
};

const CardContainer = ({ image, reverse, subtitle, title, list, description }: CardContainerProps) => {
    return (
        <div className={`card-container ${reverse ? 'reverse' : ''}`}>
            <div className={'card-container__image'}>
                <img src={image} alt="section-visual" />
            </div>
            <div className={'card-container__info'}>
                <p className={'card-container__subtitle'}>{subtitle}</p>
                <h2 className={'card-container__title'}>{title}</h2>

                {list && (
                    <ul className={'card-container__list'}>
                        {list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}

                {description &&
                    description.map((para, index) => (
                        <p className="card-container__desc" key={index}>
                            {para}
                        </p>
                    ))}
            </div>
        </div>
    );
};

const SecondSection = () => {
    return (
        <section className="second-section">
            <CardContainer
                image={'images/travel-light-second-section.jpg'}
                subtitle={'Travel light, go online'}
                title={'Create your travel journal online'}
                list={[
                    'Easily add stories to your journal in our online editor or app with unlimited storage',
                    'Add your images and choose your pages layouts between over 80 options',
                    'Personalize your travel journal with fonts and styles to your own taste',
                    'Enhance your travel journal with photos and maps.',
                ]}
            />
            <CardContainer
                image={'images/travel-light-second-section.jpg'}
                reverse={true}
                subtitle={'Your online partner for every journey'}
                title={'Journal trip: capture memories anywhere, anytime!'}
                description={[
                    'Forget about taking notes on paper, in notebooks, or working in your own chats! Capture your most beautiful travel memories in an online travel journal with the easy-to-use Travel Diaries software.',
                    'With just a few clicks, you can start your own online travel diary where you can upload photos, stories, and route maps.',
                    'Share your travel stories online as a blog, and move your memories from the screen to real life by printing them or creating postcards and photo books.',
                ]}
            />
        </section>
    );
};

export default SecondSection;