import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Movie({movie}) {
    return (
        <Col>
            <Card className='shadow-sm rounded m-3 p-2'>
                <Card.Title><Link to={"/movie/" + movie.id}>{movie.title}</Link></Card.Title>
                <Card.Text>
                    Rok: {movie.year}<br/>
                    Reżyser: {movie.director.first_name} {movie.director.last_name}<br/>
                    Scenarzysta: {movie.screenplay.first_name} {movie.screenplay.last_name}<br/>
                </Card.Text>
            </Card>
        </Col>
    )
}

function Movies() {
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('http://127.0.0.1:8000/movies/')
            const data = await response.json()

            setMovies(data);
        }

        fetchData();
    }, []);
    return (
        <>
            {!movies && <h1>Ładowanie...</h1>}
            {movies && <Container className='my-3'>
                <Row>
                    {movies.map((movie) => {
                        return <Movie key={movie.id} movie={movie} />
                    })}
                </Row>
            </Container>}
        </>
    )
}

export default Movies;