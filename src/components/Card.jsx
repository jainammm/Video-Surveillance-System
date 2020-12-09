import styles from './Card.css';

function Card(props) {
    return (
        <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
                <img src={props.image} alt="Bootstrap Thumbnail Customization" />
                <div className="caption">
                    <h3>{props.title}</h3>
                    <p className="card-description"><strong>Bootstrap Thumbnail</strong> Customization Example. Here are customized <strong>bootstrap cards</strong>. We just apply some box shadow and remove border radius.</p>
                    <p><a href="#" className="btn btn-primary" role="button">Start</a></p>
                </div>
            </div>
        </div>
    )
}

export default Card