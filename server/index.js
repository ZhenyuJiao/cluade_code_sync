import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import caseRoutes from './routes/cases.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: '请求过于频繁，请稍后再试' }));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);

// 健康检查
app.get('/api/health', (req, res) => res.json({ ok: true }));

// 启动
async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`服务器运行在 http://localhost:${PORT}`));
}

start();
