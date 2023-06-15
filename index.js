const express = require('express');
const app = express();
const formidableMiddleware = require('express-formidable');
const path = require("path");
const indexRouter = require('');


app.use(express.urlencoded());
app.use(formidableMiddleware());

app.set('views', path.join(__dirname, './views'));

app.use('/', indexRouter);

const PORT = process.env.PORT||5050;
app.listen(PORT);

console.log(`Server started on port: ${PORT}`);
