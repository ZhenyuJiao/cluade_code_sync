# 🦐 Claude Code 同步项目

这个项目用于在多台电脑间同步 Claude Code 的配置、记忆、skills 和 AI 赚钱案例网站。

## 目录结构

```
cluade_code_sync/
├── .claude/               # Claude Code 配置
│   ├── settings.json      # 项目设置
│   ├── memory/            # 记忆文件（记住你的偏好）
│   └── skills/            # 已安装的技能
├── website/               # AI 赚钱案例网站
│   ├── index.html         # 主页面
│   ├── cases.json         # 案例数据（加案例改这个文件）
│   └── css/style.css      # 样式
├── 新电脑设置指南.md       # 新电脑配置教程
└── README.md              # 本文件
```

## 使用方式

```bash
# 克隆到新电脑
git clone https://github.com/ZhenyuJiao/cluade_code_sync.git
cd cluade_code_sync

# 启动 Claude Code（自动加载项目配置）
claude
```

## 网站

`website/index.html` 是一个 AI 赚钱案例展示网站，数据从 `cases.json` 动态加载。

在浏览器中直接打开即可浏览，无需服务器。
