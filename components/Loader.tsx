import PropTypes from 'prop-types';
import Image from './Image';

type Props = {
    classNameContainerLoader: string,
    classNameContainerImage: string,
    classNameImage: string
}

const Loader = ({ classNameContainerLoader = '', classNameContainerImage = '', classNameImage = '' }: Props) => (
    <div className={classNameContainerLoader}>
        <span>
            L
        </span>
        <Image
            src="/images/pokeball.png"
            optionalClassContainer={classNameContainerImage}
            optionalClassImage={classNameImage}
            alt='pokeball image'
        />
        <span>ADING...</span>
    </div>
);

export default Loader;

Loader.propTypes = {
    classNameContainerLoader: PropTypes.string,
    classNameContainerImage: PropTypes.string,
    classNameImage: PropTypes.string
};