const   express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose');
        users           = require('./routes/api/users');
        post            = require('./routes/api/post');
        profile         = require('./routes/api/profile');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    //How to create a promise
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));