import React, {useState, useEffect} from 'react';
import {Container, Row, Form, Button, InputGroup} from 'react-bootstrap'

const DEFAULT_FORM_STATE = {title: '', year: '', description: '', rating:'', director_id:'1',
    screenplay_id:'1', genre_id:[], starring_id:[{person:'1', role:''}]}

function FormMovie(props) {
    const [form, setForm] = useState(DEFAULT_FORM_STATE)
    const [persons, setPersons] = useState([])
    const [genres, setGenres] = useState([])

    useEffect(() => {
        if(props.location.pathname.indexOf('edit') > -1) {
            const fetchData = async() => {
                const response = await fetch(`http://127.0.0.1:8000/movies/${props.match.params.movieID}`)
                const data = await response.json()
                let newStarring = data.starring.map((star) => {
                    return {person:star.person.id, role:star.role}
                })
                let newGenres = data.genre.map((genre) => {
                    return genre.id
                })
                setForm({title: data.title, year: data.year, description: data.description, rating:data.rating,
                director_id:data.director.id, screenplay_id:data.screenplay.id, genre_id:newGenres,
                starring_id:newStarring})
            }

            fetchData();
        }
    }, []);

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
                genre_id:values
            }
        })
    }

    const handleChangeStarring = (index, event) => {
        const newStarring = [...form.starring_id];
        newStarring[index][event.target.name] = event.target.value;

        setForm(prevState => {
            return {
                ...prevState,
                starring_id: newStarring
            }
        });
    }

    const handleAddFields = () => {
        setForm(prevState => {
            return {
                ...prevState,
                starring_id: [...prevState.starring_id, {person:'1', role:''}]
            }
        });
    }

    const handleRemoveFields = id => {
        const newStarring = [...form.starring_id];
        newStarring.splice(id, 1)
        setForm(prevState => {
            return {
                ...prevState,
                starring_id: newStarring
            }
        });
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(props.location.pathname.indexOf('edit') > -1) {
            fetch(`http://127.0.0.1:8000/movies/${props.match.params.movieID}/`, {
                method:'PATCH',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(form)
            }).then((response) => {
                console.log('Udało się edytować film')
            }).catch(function(error){
                console.log(error);
            })
        } else {
            let url = 'http://127.0.0.1:8000/movies/'
            fetch(url, {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(form)
            }).then((response) => {
                console.log('Udało sie dodać film')
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    return (
        <Container className='my-3'>
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
                        <Form.Select name='director_id' value={form.director_id} onChange={handleChange}>
                        {persons.map((person) => {
                            return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                        })}
                        </Form.Select>
                    </InputGroup>

                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Scenarzysta:</Form.Label>
                        <Form.Select name='screenplay_id' value={form.screenplay_id} onChange={handleChange}>
                        {persons.map((person) => {
                            return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                        })}
                        </Form.Select>
                    </InputGroup>

                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Gatunki:</Form.Label>
                        <Form.Select multiple name='genre_id' value={form.genre_id} onChange={handleSelectedMultiple}>
                        {genres.map((genre) => {
                            return <option value={genre.id} key={genre.id}>{genre.name}</option>
                        })}
                        </Form.Select>
                    </InputGroup>

                    <Form.Label className='m-1 w-25'>Obsada:</Form.Label>
                    {form.starring_id.map((star, index) => {
                     return (<div key={index}>
                        <InputGroup className='m-1'>
                            <Form.Label className='m-1 ms-4 mt-2'>Aktor:</Form.Label>
                            <Form.Select name='person' value={star.person} onChange={e => handleChangeStarring(index, e)}>
                                {persons.map((person) => {
                                    return <option value={person.id} key={person.id}>{person.first_name} {person.last_name}</option>
                                })}
                            </Form.Select>
                            <Form.Label className='m-1 ms-4 mt-2'>Rola:</Form.Label>
                            <Form.Control type='text' name='role' value={star.role} onChange={e => handleChangeStarring(index, e)}/>
                            <Button className='m-1' variant='danger' disabled={form.starring_id.length === 1} onClick={() => handleRemoveFields(index)}>−</Button>
                        </InputGroup>
                    </div>)
                    })}
                    <Row className='justify-content-center'>
                    <Button className='m-1 ms-5 w-25' variant='success' onClick={handleAddFields}>+</Button>
                    </Row>
                    {props.location.pathname.indexOf('edit') > -1 ?
                    <Button type='submit' variant='warning'>Edytuj film</Button> :
                    <Button type='submit' variant='primary'>Dodaj film</Button>}
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormMovie;