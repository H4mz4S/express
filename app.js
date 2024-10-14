const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.use((req, res, next) => {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay(); 

    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next(); 
    } else {
        res.send('Sorry, the application is only available during business hours (Mon-Fri, 9 AM - 5 PM).');
    }
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
