import NavBar from '../../components/NavBar'
import Card from '../../components/Card'
import CarouselScreen from './CarouselScreen'

function Home() {
    return (
        <div>
            <NavBar />
            <CarouselScreen />
            <div className="container" style={{marginTop:"24px"}} >
                <div className="row" style={{marginTop:"24px"}}>
                    <Card title="Scene Detection" image="https://1.bp.blogspot.com/-aFQ-W_KTFWQ/V6BdtpSUy6I/AAAAAAAAAH4/xD_U-BYItSsNvk1UGfROqLBzzU1h32oXQCLcB/s320/4-diwali-greeting-cards-by-ajay-acharya.jpg" />
                    <Card title="Scene Detection" image="https://1.bp.blogspot.com/-aFQ-W_KTFWQ/V6BdtpSUy6I/AAAAAAAAAH4/xD_U-BYItSsNvk1UGfROqLBzzU1h32oXQCLcB/s320/4-diwali-greeting-cards-by-ajay-acharya.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Home