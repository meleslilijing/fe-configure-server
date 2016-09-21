TODO
数据库操作引入事务
api需要以restfull的方式重新组织











----------------------------------------------------------------------

# koa-app 的generator项目

## START

start: `npm run start`

server:
- start:  运行本地服务，直接访问本地服务器端口

client:
- dev:    mock server的develop模式
- build:  mock server的build模式




## DB desine

｀表结构需要修改｀

### Table: projectList
| Column | Type     | describe |
| :------------- | :------------- | :------------- |
| id       | INT       |                      |
| name       | VARCHAR(64)       | 项目名称            |
| nameText       | VARCHAR(64)       | 项目文字名       |
| currentVersion       | VARCHAR(24)   | 当前版本         |
| timestamp       | TIMESTAMP   | 当前版本         |

### Table: versionHistory
| Column | Type     | describe |
| :------------- | :------------- | :------------- |
| id       | INT       |   |
| name| VARCHAR(64) | 项目名称 |
| version| VARCHAR(24) | 版本号 |
