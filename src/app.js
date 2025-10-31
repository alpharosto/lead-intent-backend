import express from 'express';
import cors from 'cors';
import offerRoutes from './routes/offer.routes.js'
import leadsRoutes from './routes/leads.routes.js';
import scoreRoutes from './routes/score.routes.js';
import resultsRoutes from './routes/results.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/offer', offerRoutes);
app.use('/leads', leadsRoutes);
app.use('/', scoreRoutes);
app.use('/', resultsRoutes);
app.get('/health', (_, res) => res.json({ ok: true }));

export default app;
