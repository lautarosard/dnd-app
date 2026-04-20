import './loading.css';

export const Loader = ({message = ""}) => {
    return(
    <div className="loading-container">
        <div className="loader"></div>
        <p className="loader-message">{message}</p>
    </div>
    );
}
    

