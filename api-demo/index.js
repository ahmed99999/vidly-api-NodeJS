const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const port = process.env.PORT || 3000;

const genres = [
    { id: 1, name:'action'},
    { id: 2, name:'comedy'},
    { id: 3, name:'horror'}
];

app.get('/', (req, res)=>{
    res.send('vidly app root');
});

app.get('/api/genres', (req, res) => {
    res.send( genres );
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt( req.params.id ));
    if ( !genre ) return res.status(404).send('genre was not found 404 Error');
    res.send( genre );
});

app.post('/api/genres', (req, res) => {
   
    const { error } = validateCourse( req.body );
    if ( error ) return res.status(400).send( error.details.reduce( (e, d) => e+'/'+d.message, '') );

    const genre = {
        id: genres.length+1,
        name: req.body.name
    };
    genres.push( genre );
    res.send( genre );
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt( req.params.id ));
    if ( !genre ) return res.status(404).send('genre was not found 404 Error');

    const { error } = validateCourse( req.body );
    if ( error ) return res.status(400).send( error.details.reduce( (e, d) => e+'/'+d.message, '') );

    genres.name = req.body.name;
    res.send( genres );
});

app.delete( '/api/genres/:id', (req, res)=>{
    const genres = genres.find( c => c.id === parseInt( req.params.id ));
    if ( !genres ) return res.status(404).send('genres was not found 404 Error');

    const index = genres.indexOf( genres );
    genres.splice( index, 1 );
    res.send( genres );
});

app.listen( port, ()=>{
    console.log(`Listening on port ${port}... `);
});

validateCourse = genre => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate( genre, schema );
};