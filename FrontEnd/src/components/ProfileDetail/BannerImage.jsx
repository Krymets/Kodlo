import { PropTypes } from 'prop-types';
import classes from './BannerImage.module.css';

function BannerImage ({ data }) {

    return (
        <div className={classes['banner-image__block']}>
            <div className={classes['banner-image']}>
                {data.banner_image ? (
                    <img src={data.banner_image} alt="Company Banner" />
                    ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="103"
                    height="80"
                    viewBox="0 0 103 80"
                    fill="none"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 40V80H51.2941H102.588V40V0H51.2941H0V40ZM84.9092 10.652L91.6322 11.289V40.156V69.022L51.0451 68.761L10.458 68.5L10.1941 39.818L9.93014 11.136L12.6841 10.718C17.2617 10.023 77.6942 9.968 84.9092 10.652ZM26.6431 19.08C23.7128 20.794 21.7856 25.537 22.8642 28.383C25.4668 35.258 35.6758 34.13 37.4088 26.775C37.9238 24.591 37.4537 23.45 35.0384 21.025C31.9049 17.879 29.6072 17.347 26.6431 19.08ZM57.5052 32.25C55.6447 34.587 53.1188 37.962 51.8927 39.75C49.2105 43.662 47.9027 43.795 44.7922 40.471L42.4257 37.941L33.1649 47.201C28.0713 52.294 23.9041 56.807 23.9041 57.23C23.9041 57.654 36.7256 58 52.3967 58C76.8954 58 80.8116 57.796 80.3345 56.548C79.6095 54.651 61.8428 28 61.3029 28C61.0759 28 59.3667 29.913 57.5052 32.25Z" fill="#BFC6CF"/>
                </svg>
                )}
            </div>
        </div>
    );
}

export default BannerImage;

BannerImage.propTypes = {
    data: PropTypes.shape({
        banner_image: PropTypes.string,
    }),
};
