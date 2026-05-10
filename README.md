# AI 赚钱案例库

普通人用 AI 赚钱的真实案例和详细教程。React 前端 + Node.js 后端 + MongoDB。

## 目录结构

```
cluade_code_sync/
├── .claude/             # Claude Code 配置、skills、记忆
├── client/              # React 前端 (Vite)
│   └── src/
│       ├── api/         # API 接口
│       ├── components/  # 通用组件
│       ├── context/     # React Context
│       ├── hooks/       # 自定义 Hooks
│       └── pages/       # 页面
├── server/              # Node.js 后端
│   ├── config/          # 数据库配置
│   ├── middleware/       # JWT 认证中间件
│   ├── models/          # Mongoose 模型
│   └── routes/          # API 路由
├── website/             # 静态版网站（双击可直接打开）
└── docs/
```

## 本地开发

```bash
# 后端启动
cd server
npm install
cp .env.example .env   # 配置 MongoDB 连接
node seed.js            # 初始化数据（管理员 + 案例）
npm run dev

# 前端启动（新开一个终端）
cd client
npm install
npm run dev
```

## 管理员

- 默认账号：`admin@example.com`
- 默认密码：`admin123`
- 登录地址：http://localhost:5173/admin/login

## 技术栈

| 层 | 选型 |
|---|---|
| 前端 | React 18 + Vite + React Router |
| 后端 | Node.js + Express |
| 数据库 | MongoDB |
| 认证 | JWT + bcrypt |

## 部署

- 前端 → Vercel
- 后端 → Railway
- 数据库 → MongoDB Atlas
