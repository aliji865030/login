const express = require('express')

const app = express();
app.use(express.json())


const data = [];


const authorizationMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    const userExist = data.find((user) => user.email === email && user.password === password)

    if (userExist) {
        next()
    } else {
        res.status(400).json({
            success: false,
            message: 'invalid details'
        })
    }
}


app.post('/api/v1/signUp', (req, res) => {

    const { email, password } = req.body;
    // Check if user already exists
    const userExist = data.find((user) => user.email === email && user.password === password);
    if (userExist) {
        return res.status(409).json({
            success: false,
            message: 'User already exists'
        });
    }

    data.push({ email, password });
    console.log("data", data);
    res.status(201).json({
        success: true,
        message: 'User created successfully'
    });
})



let products = [
    {
        id: 1,
        name: 'abbas',
        data: 'mobile'
    },
    {
        id: 2,
        name: 'ali',
        data: 'mobile'
    },
    {
        id: 3,
        name: 'sunil',
        data: 'mobile'
    }
]


app.get('/api/v1/signin', authorizationMiddleware, (req, res) => {
    let data = [...products];
    try {
        res.json({
            success: true,
            message: 'user loged in successfully',
            userJsonData: data
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'user data not exists'
        })
    }
})

app.use('/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'path not found'
    })
})

app.listen(8080, () => { console.log(`server is running port 8080`); })