import express from 'express';
import alertsCtrls from './controllers/alertsCtrls.js';
import { connectDB } from './db/db.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api/alerts', alertsCtrls.getAlerts)
app.get('/api/alerts/:id', alertsCtrls.getAlert)
app.post('/api/alerts', alertsCtrls.createAlert)
app.put('/api/alerts/:id', alertsCtrls.updateAlert)
app.delete('/api/alerts/:id', alertsCtrls.deleteAlert)

app.use(errorHandler)

try {
    await connectDB()
    app.listen(port, () => console.log(`Server running on port ${port}`))
} catch (error) {
    console.log(`Failed to start server, error: ${error}`)
    process.exit(1)
}