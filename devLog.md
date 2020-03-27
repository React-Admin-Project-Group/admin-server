<h1 style='text-align:center'>下厨房服务器端开发日志
    
</h1>

### 连接mongodb

- 安装：npm install mongoose
- 创建连接数据文件connect.js

### 管理员模块开发

- 创建AdminModel，关联到数据库的一张表(集合)
- 创建AdminControl， 里面写管理员的增删改查方法
- 创建管理员接口路由AdminRouter，里面写后端请求接口

### 后端路由实现

- 安装express: npm install express
- 安装body-parser: npm install body-parser

### 接口生成

- 全局安装apidoc: npm install apidoc
- 创建apidoc.json
- 按照规范，在相应接口添加注释
- 执行：apidoc -i router/ -o doc/

### token实现