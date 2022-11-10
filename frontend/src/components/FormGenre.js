import React, {useState} from 'react';
import {Container, Form, Button, InputGroup} from 'react-bootstrap'

function FormGenre() {
    const [form, setForm] = useState({name:''})

    const handleChange = e => {
        const value = e.target.value;
        setForm({name: value});
    };

    const handleSubmit = e => {
        e.preventDefault()
        let url = 'http://127.0.0.1:8000/genres/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(form)
        }).then((response) => {
            setForm({name:''})
        }).catch(function(error){
            console.log('ERROR: ', error);
        })
    }

    return (
        <Container className='m-3'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup className='m-2'>
                        <Form.Label className='m-1 w-25'>Nazwa:</Form.Label>
                        <Form.Control type='text' name='name' value={form.name} onChange={handleChange}/>
                    </InputGroup>
                    <Button type='submit' variant='primary'>Dodaj gatunek</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormGenre;