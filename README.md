# 学生党员先锋力考核工作台

面向入党积极分子和教师管理员的七大先锋力积分量化考核系统。

## 演示账号

- 学生：`stu01` / `123456`
- 管理员：`admin` / `admin123`

演示密码仅用于体验，正式投入使用前应由管理员统一重置。

## 功能

- 思想、梯队、清廉、堡垒、发声、示范、实干七个任务模块
- 做好自己、带动他人、党建带团建三档任务
- 学生提交完成说明、证明文件或材料链接并申请积分
- 管理员审核通过或驳回，并核定实际积分
- 自动统计总分、模块得分、综合排行和全量记录
- 管理员新增、停用和启用学生账号
- 一票否决事项提示

## 本地运行

```bash
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_sticky_speedball.sql
npm run dev -- --port 5173
```

访问 `http://127.0.0.1:5173/`。

## 数据与文件

- 结构化数据使用 Cloudflare D1
- 证明文件使用 Cloudflare R2
- 密码使用 PBKDF2-SHA256 派生后保存
- 会话 Cookie 为 HttpOnly、SameSite=Lax

当前版本用于小规模试用。正式上线前建议补充批量导入、密码重置、学期归档、数据导出、操作日志和备份策略。
