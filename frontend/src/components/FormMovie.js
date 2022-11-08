import React, {useState, useEffect} from 'react';
import {Container, Row, Form, Button, InputGroup} from 'react-bootstrap'

function FormMovie() {
    const [form, setForm] = useState({title: '', year: '', description: '', rating:'', director:'1', screenplay:'1', genres:[],
    starring:[{person:'1', role:''}]})
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

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSelectedMultiple = e => {
        const values = [...e.target.selectedOptions].map(option => option.value);
        setForm(prevState => {
            return {
                ...prevState,
                genres:values
            }
        })
    }

    const handleChangeStarring = (index, event) => {
        const newStarring = [...form.starring];
        newStarring[index][event.target.name] = event.target.value;

        setForm(prevState => {
            return {
                ...prevState,
                starring: newStarring
            }
        });
    }

    const handleAddFields = () => {
        setForm(prevState => {
            return {
                ...prevState,
                starring: [...prevState.starring, {person:'1', role:''}]
            }
        });
    }

    const handleRemoveFields = id => {
        const newStarring = [...form.starring];
        newStarring.splice(id, 1)
        setForm(prevState => {
            return {
                ...prevState,
                starring: newStarring
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(form);
    }

    return (
        <Container className='m-3'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Tytuł:</Form.Label>
                        <Form.Control type='text' name='title' value={form.title} onChange={handleChange}/>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Rok produkcji:</Form.Label>
                    <Form.Control type='number' name='year' value={form.year} onChange={handleChange}/>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Opis:</Form.Label>
                    <Form.Control as='textarea' name='description' value={form.description} onChange={handleChange}
                    style={{height:'100px'}}/>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Ocena:</Form.Label>
                    <Form.Control type='number' name='rating' value={form.rating} onChange={handleChange}/>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Reżyser:</Form.Label>
                    <Form.Select name='director' value={form.director} onChange={handleChange}>
                    {persons.map((person) => {
                        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                    })}
                    </Form.Select>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Scenarzysta:</Form.Label>
                    <Form.Select name='screenplay' value={form.screenplay} onChange={handleChange}>
                    {persons.map((person) => {
                        return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                    })}
                    </Form.Select>
                    </InputGroup>

                    <InputGroup className='m-2'>
                    <Form.Label className='m-1 w-25'>Gatunki:</Form.Label>
                    <Form.Select multiple value={form.genres} onChange={handleSelectedMultiple}>
                    {genres.map((genre) => {
                        return <option value={genre.id} key={genre.id}>{genre.name}</option>
                    })}
                    </Form.Select>
                    </InputGroup>

                    <Form.Label className='m-1 w-25'>Obsada:</Form.Label>
                    {form.starring.map((star, index) => {
                     return (<div key={index}>
                     <InputGroup>
                        <Form.Label className='m-1 ms-4 mt-2'>Aktor:</Form.Label>
                        <Form.Select name='person' value={star.person} onChange={e => handleChangeStarring(index, e)}>
                            {persons.map((person) => {
                                return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                            })}
                        </Form.Select>
                        <Form.Label className='m-1 ms-4 mt-2'>Rola:</Form.Label>
                        <Form.Control type='text' name='role' value={star.role} onChange={e => handleChangeStarring(index, e)}/>
                        <Button className='m-1' variant='danger' disabled={form.starring.length === 1} onClick={() => handleRemoveFields(index)}>−</Button>
                        </InputGroup>
                    </div>)
                    })}
                    <Row className='justify-content-center'>
                    <Button className='m-1 ms-5 w-25' variant='success' onClick={handleAddFields}>+</Button>
                    </Row>
                    <Button type='submit' variant='primary'>Dodaj film</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormMovie;