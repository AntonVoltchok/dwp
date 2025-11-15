import '../styles/app.scss';
// import { useIsMobile } from '../utils/device';

const Heading = (props) => {
    // const isMobile = useIsMobile();
    const line = <div className='line' />;
    
    return (
        <div className='line-container'>
            {line}
            <div className='line-heading'>{props.children}</div>
            {line}
        </div>
    );
}

export default Heading;