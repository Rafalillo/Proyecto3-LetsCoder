import React from "react";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";


function MainPage() {
    return (
        <Container>
        <Header />
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <div  className="top-50 start-50">
                            <Card.Img variant="top" src="https://res.cloudinary.com/dxk3ghbdz/image/upload/v1647516468/KaiYoga-product/vhsxukaavsqfgopajr7i.jpg" className="img-Card" />
                            </div>
                            <Card.Body>
                                <Card.Title>Producto</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <button className="btn btn-dark button-main">
                                    ver
                                </button>
                                <button className="btn btn-dark button-main">
                                    comprar
                                </button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Footer />
        </Container>
    )
}



export default MainPage;