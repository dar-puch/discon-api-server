const express = require('express');
const port = process.env.PORT || 4000;
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const appRouter = require('./routes/appRouter')();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/', appRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
})

