import express from 'express';
import cors from 'cors';
import offerRoutes from './routes/offer.routes'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/offer', offerRoutes);
app.get('/health', (_, res) => res.json({ ok: true }));

export default app;
