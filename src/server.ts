import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
    console.log(request.query);

    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
        {name: 'Felipe', age: 30},
    ];

    return response.json(users);
});

app.post('/users', (request, response) => {
    console.log(request.body);

    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
        {name: 'Felipe', age: 30},
    ];

    return response.json(users);
});

app.delete('/users/:id', (request, response) => {
    console.log(request.params);

    const users = [
        {name: 'Diego', age: 25},
        {name: 'Vini', age: 21},
        {name: 'Felipe', age: 30},
    ];

    return response.json(users);
});

app.listen(3333);
