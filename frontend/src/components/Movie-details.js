import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap'

function MovieDetails(props) {
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://127.0.0.1:8000/movies/${props.match.params.movieID}`)
            const data = await response.json()

            setMovie(data);
        }

        fetchData();
    }, [])
    return (
    <>
        {!movie && <h1>Ładowanie...</h1>}
        {movie && <Container className='m-4'>
            <Row>
                <Col>
                    <h1>{movie.title}</h1>
                    <Button variant='warning' href={`/edit/movie/${movie.id}`}>Edytuj film</Button>
                </Col>
                <Col>
                    <p>{movie.description}</p>
                    Rok produkcji: {movie.year}<br/>
                    Reżyser: {movie.director.first_name} {movie.director.last_name}<br/>
                    Scenarzysta: {movie.screenplay.first_name} {movie.screenplay.last_name}<br/>
                    Gatunek: {movie.genre.map((genre, index, array) => {
                    if (index === array.length - 1) {
                    return genre.name
                    } else {
                    return genre.name + '/'
                    }
                    })}<br/>
                    Ocena: {movie.rating}<br/>
                    Obsada: <ul>{movie.starring.map((star) => {
                        return <li key={star.person.id}>{star.person.first_name} {star.person.last_name} jako {star.role}</li>
                    })}
                    </ul>
                </Col>
            </Row>
        </Container>}
    </>
    )
}

export default MovieDetails;