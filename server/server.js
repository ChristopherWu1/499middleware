const express = require('express')
const app = express()
//Cross-origin resource sharing (CORS)
const cors = require('cors')
//cors enabled for localhost:3000
/*let corsOptions ={
    origin:['http://localhost:3000']
}*/
//required to use python script
const { spawn } = require('child_process');

//CORS enabled for all origins
app.use(cors());
app.use(express.json());//used to parse json bodies
app.use(express.urlencoded({ extended: false }));//used to parse URL-encoded bodies
//sends jsons to the frontend
app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
});
app.get('/home', (req, res) => {
    res.json({ "string": "Hello World", "number": "69" })
});
//cors as middleware
app.post('/data',/*cors(corsOptions),*/(req, res) => {
    console.log(req.body)
    var num1 = req.body.num1;
    console.log(num1);
    var num2 = req.body.num2;
    console.log(num2);
    //call python script
    const python = spawn('python', ['algorithms.py', num1, num2]);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString().split(',');
        console.log(typeof dataToSend);
        console.log(dataToSend);
        res.json({ "sum": dataToSend });
    });

})
app.listen(5000, () => { console.log("Server started on port 5000") })