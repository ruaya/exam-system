# exam-system

## 2. 查看npm版本 确认是否安装npm
```
npm -v
```

## 1. 下载依赖
```
npm install
```

## 2. 启动数据库 mongoDB
```
net start mongoDB 
```

## 2.1 若不导入数据库，将在第一次启动时自动生成一批测试数据
```
// mongodump -h localhost:27017 -d examSystem -o d://test
mongorestore -h localhost:27017 -d examSystem -directoryperdb ../mongodb
```

## 3. 启动后台
```
npm start
```

### 4. 启动后台管理
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
