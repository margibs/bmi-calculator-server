const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// End point for Standard Calculation
app.post('/bmi-calculator/standard', (req, res) => {
    const { weight, feet, inches } = req.body;

    let height = (feet * 12) + inches;
    let bmi = (weight / (height * height) * 703);

    let message = bmiMessage(bmi);
    res.json({ "bmi" : isNaN(bmi) ? 0 : bmi.toFixed(1), "message" : message});
});


app.post('/bmi-calculator/metric', (req, res) => {
    const { weight, height  } = req.body; 
    let bmi = (weight / (height  * height) ) * 10000;
    
    let message = bmiMessage(bmi);
    res.json({ "bmi" : isNaN(bmi) ? 0 : bmi.toFixed(1), "message" : message});
});


const bmiMessage = (bmi) => {
    
    let message = '';

    if(isNaN(bmi)) {
        return message;
    }

    if (bmi < 18.5 ) {
        message = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        message = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        message = "Overweight";
    } else {
        message = "Obese";
    }

    return message;
}

app.listen(5000,() => {
    console.log(`Server Started on Port http://localhost:5000`);
});