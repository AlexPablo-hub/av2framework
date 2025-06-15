const express = require('express');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'API funcionando!', timestamp: new Date().toISOString() });
});

module.exports = app;