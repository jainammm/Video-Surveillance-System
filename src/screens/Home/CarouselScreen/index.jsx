import Carousel from 'react-bootstrap/Carousel'


function CarouselScreen() {
    return (
        <Carousel>
            <Carousel.Item>
                <center>
                    <img
                        style={{ height: 400 }}
                        className="d-block"
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg"
                        alt="First slide"
                    />
                </center>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img
                        style={{ height: 400 }}
                        className="d-block"
                        src="https://wowslider.com/sliders/demo-93/data1/images/lake.jpg"
                        alt="Third slide"
                    />
                </center>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <center>
                    <img
                        style={{ height: 400 }}
                        className="d-block"
                        src="data:image/jpeg;base64,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"
                        alt="Third slide"
                    />
                </center>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselScreen