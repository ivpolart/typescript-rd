import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/users'

const app = express()
const PORT = 3000

app.use(express.json())

app.use((req, res, next) => {
  console.log(`logging, ${req.method} ${req.url}`)
  next()
})

app.use((req, res, next) => {
  console.log('Another middleware executed');
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Typescript with Express!')
})

app.get('/tasks', (req: Request, res: Response, next: NextFunction) => {
  res.send('Tasks list')
})

app.use('/tasks', 
)
// app.post('/tasks', (req: Request, res: Response) => {
//   console.log(req.body);
//   const created = req.body
//   res.status(201).json(created)
// })

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})