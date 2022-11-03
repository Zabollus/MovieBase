import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from 'react-bootstrap'

function Movie({movie}) {
    const [director, setDirector] = useState('')
    const [screenplay, setScreenplay] = useState('')
    useEffect(() => {
        const fetchDirector = async() => {
        const response = await fetch(movie.director)
        const data = await response.json()

        setDirector(data);
        }
        const fetchScreenplay = async() => {
        const response = await fetch(movie.screenplay)
        const data = await response.json()

        setScreenplay(data);
        }
        fetchDirector();
        fetchScreenplay();
    }, []);

    return (
        <Col>
            <Card className='shadow-sm rounded'>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    Rok: {movie.year}<br/>
                    Reżyser: {director.first_name} {director.last_name}<br/>
                    Scenarzysta: {screenplay.first_name} {screenplay.last_name}<br/>
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
            {movies && <Container>
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