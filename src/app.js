import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser'; 
import { _get, _post } from './service/api.js' 
import store from './store/store.js';
import { loadCountries } from './actions/appActions.js'
import { v4 as uuidv4 } from 'uuid';

var app = express();
app.use(express.static('/public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
loadCountries();
var countries = {}
store.subscribe(() => {
    countries = store.getState().countries
})

// Apply nunjucks and add custom filter and function (for example). 
var env = nunjucks.configure(['src/views/'], { // set folders with templates
    autoescape: true, 
    express: app
});
env.addFilter('myFilter', function(obj, arg1, arg2) {
    console.log('myFilter', obj, arg1, arg2);
    // Do smth with obj
    return obj;  
});
env.addGlobal('onSubmit', function(obj) { 
    console.log('onSubmit function');
    return obj;
});


app.get('/', (req, res) => {
    res.render('index.html', {title: 'Some Useful Government Service', countries: countries});    
});

app.post('/form', urlencodedParser, (req, res) => {   
    const {name, sex, age , country} = req.body
    const userId = uuidv4()
    const createUserRequest = {userId, name, sex, age, country}
    console.log("req: ",createUserRequest);  
    let callbackFunction = (user)=>{
        console.log("user ", user);
        res.render('result.html', {title: 'Some Useful Government Service', name: user.name }); 
    }
    _post('http://localhost:8080/saveuser', JSON.stringify(createUserRequest), callbackFunction)
 }) 

app.listen(3000, function() {
    console.log('Example app listening on port 3000...');
});