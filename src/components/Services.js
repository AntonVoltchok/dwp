import content from '../utils/content';
import '../styles/services.scss';
import Heading from './Heading';
// import { useIsMobile } from '../utils/device';

const Services = () => {
    // const isMobile = useIsMobile();

    const serviceBlock = (obj) => {
        return <div className='service'>
                <div className='service-title'>{obj.title}</div>
                <div className='service-desc'>{obj.description}</div>
        </div>
    }
    
    return (
        <div className='services-container'>
            <Heading>Services</Heading>
            <div className='services-content'>
                {content?.services?.map(service => serviceBlock(service))}
            </div>
        </div>
    );
}

export default Services;