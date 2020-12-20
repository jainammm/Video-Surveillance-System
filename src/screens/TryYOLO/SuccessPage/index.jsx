import classes from './SuccessPage.module.css';

function SuccessPage() {
    return (
        <div className={classes.successMessage}>
            <svg viewBox="0 0 76 76" className={classes.successMessage__icon}>
                <circle cx="38" cy="38" r="36" />
                <path fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.7,40.9l10.9,10.9l28.7-28.7" />
            </svg>
            <h1 className={classes.successMessage__title}>File Uploaded!</h1>
            <div className={classes.successMessage__content}>
                <p>We are proccessing the video. Result will be ready in some time.</p>
            </div>
        </div>
    )
}

export default SuccessPage