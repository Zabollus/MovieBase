import React, {useState} from 'react';
import {Container, Form, Button, InputGroup} from 'react-bootstrap'

function FormPerson() {
    const [form, setForm] = useState({first_name:'', last_name:''})

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        let url = 'http://127.0.0.1:8000/persons/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(form)
        }).then((response) => {
            setForm({first_name:'', last_name:''})
        }).catch(function(error){
            console.log('ERROR: ', error);
        })
    }

    return (
        <Container className='my-3'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Imię:</Form.Label>
                        <Form.Control type='text' name='first_name' value={form.first_name} onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Nazwisko:</Form.Label>
                        <Form.Control type='text' name='last_name' value={form.last_name} onChange={handleChange}/>
                    </InputGroup>
                    <Button type='submit' variant='primary'>Dodaj osobę</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormPerson;