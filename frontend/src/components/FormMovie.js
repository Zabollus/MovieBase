import React, {useState, useEffect} from 'react';
import {Container, Form} from 'react-bootstrap'

function FormMovie() {
    const [form, setForm] = useState({title: '', year: '', description: '', director:1, screenplay:1})
    const [persons, setPersons] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('http://127.0.0.1:8000/persons/')
            const data = await response.json()

            setPersons(data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('http://127.0.0.1:8000/genres/')
            const data = await response.json()

            setGenres(data);
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Tytuł:</Form.Label>
                    <Form.Control type='text' name='title' value={form.title} onChange={handleChange}/>
                    <Form.Label>Rok produkcji:</Form.Label>
                    <Form.Control type='number' name='year' value={form.year} onChange={handleChange}/>
                    <Form.Label>Opis:</Form.Label>
                    <Form.Control as='textarea' name='description' value={form.description} onChange={handleChange}
                    style={{height:'100px'}}/>
                    <Form.Label>Reżyser:</Form.Label>
                    <Form.Select name='director' value={form.director} onChange={handleChange}>
                    {persons.map((person) => {
                        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                    })}
                    </Form.Select>
                    <Form.Label>Scenarzysta:</Form.Label>
                    <Form.Select name='screenplay' value={form.screenplay} onChange={handleChange}>
                    {persons.map((person) => {
                        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                    })}
                    </Form.Select>
                    <Form.Label>Gatunki:</Form.Label>
                    {genres.map((genre) => {
                        return <Form.Check label={genre.name}/>
                    })}
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormMovie;