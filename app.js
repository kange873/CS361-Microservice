const express = require('express');
const bodyParser = require('body-parser')
const Jimp = require('jimp');
const app = express();
const path = require('path');

const port = 7099;
const thumbnail = path.join(__dirname, '/uploads/thumbnail.jpg');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.urlencoded({ extended: true }));

// upload route
app.post('/upload', (req, res) => {
    try {
        Jimp.read(req.body.image).then(image => {
            image
            .resize(100,100)
            //saves thumbnail into uploads directory
            .write(thumbnail);
        }) .catch((error) => {
            console.error(error);
        });
        return res.status(201).json({
            message: "Image has been resized"
        });
    } catch (error) {
        console.error(error);
    }
});

// thumbnail route to get the image
app.get('/thumbnail', (req, res) => {
    res.sendFile(thumbnail);
});

app.listen(port, () => console.log('Ready for Requests'));
