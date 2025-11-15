import content from '../utils/content';
import '../styles/intro.scss';
import { useIsMobile } from '../utils/device';

const Intro = () => {
    const isMobile = useIsMobile();
    const line = <div className='quote-line' />
    const contentMobile = (
        <div className='explore-section-mb'>
            <div className='quote-card-mb'>
                <h4>{content.quote}</h4>
                <p>{content.quoteAuthor}</p>
            </div>
            <div className='explore-content-mb'>
                <p>{content.description}</p>
            </div>
            <div className='office-img-mb' aria-hidden='true' />
        </div>
    );
    const contentDesktop = (
        <div className='explore-section'>
            <div className='quote-container'>
                {line}
                <div className='quote'>
                    <div>{content.quote}</div>
                    <p>{content.quoteAuthor}</p>
                </div>
                {line}
            </div>
            <div className='content-img-container'>
                <div className='explore-content'>
                    <p>{content.description}</p>
                </div>
                <div className='office-img' aria-hidden='true' />
            </div>

        </div>
    )

    return isMobile ? contentMobile : contentDesktop;
}

export default Intro;
