import content from '../utils/content';
import styles from '../styles/contact.module.scss';
import Heading from './Heading';

const Contact = () => {
    const { phone, email, office } = content.contact || {};

    return (
        <section className={styles.contactSection} id="contact">
            <Heading>Contact</Heading>
            <div className={styles.contactDetails}>
                {phone && (
                    <a href={`tel:${phone}`} className={styles.contactLink}>
                        {phone}
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} className={styles.contactLink}>
                        {email}
                    </a>
                )}
                {office && (
                    <p className={styles.contactAddress}>
                        {office}
                    </p>
                )}
            </div>
        </section>
    );
}

export default Contact;

