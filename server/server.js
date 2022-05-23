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
    res.json({ "string": "Sever is working", "number": "44" })
});
//cors as middleware
app.post('/data',/*cors(corsOptions),*/(req, res) => {
    console.log(req.body)
    var num1 = req.body.num1;
    console.log(num1);
    var num2 = req.body.num2;
    console.log(num2);
    var num3 = req.body.num3;
    console.log(num3);
    var num4 = req.body.num4;
    console.log(num4);
    var num5 = req.body.num5;
    console.log(num5);
    var num6 = req.body.num6;
    console.log(num6);
    var num7 = req.body.num7;
    console.log(num7);
    var num8 = req.body.num8;
    console.log(num8);
    var num9 = req.body.num9;
    console.log(num9);
    var num10 = req.body.num10;
    console.log(num10);
    var num11 = req.body.num11;
    console.log(num11);
    var num12 = req.body.num12;
    console.log(num12);
    var num13 = req.body.num13;
    console.log(num13);
    var num14 = req.body.num14;
    console.log(num14);
    var num15 = req.body.num15;
    console.log(num15);
    var num16 = req.body.num16;
    console.log(num16);
    var num17 = req.body.num17;
    console.log(num17);
    var num18 = req.body.num18;
    console.log(num18);
    var num19 = req.body.num19;
    console.log(num1);


    //call python script
    const python = spawn('python3', ['algorithms3.py',num1,num2,num3,num4,num5,num6,num7,num8,num9,num10,num11,num12,num13,num14,num15,num16,num17,num18,num19]);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString().split(',');
        console.log(typeof dataToSend);
        console.log(dataToSend);
        res.json({ "sum": dataToSend });
    });

})
app.listen(5000, () => { console.log("Server started on port 5000") })
