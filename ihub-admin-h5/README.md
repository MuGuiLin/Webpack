# iHub 后台管理前端，原工程代码分支


### 项目说明：
> iHub 后台管理项目，目前不是前后端代码分离项目，但又用到了Webpack工程化 和 Vue框架，UEditor富文本在线编辑器、Colpick等第三方插件。

> 用webpack工程化管理工具进行打包后，再给后端PHP进行嵌套，由于打包后的js、css、img等被进行了压缩和兼容性处理，所以文件较大，不易修改。

> 目前的情况是每改一次都要进行打包，然后将生成后的代码给后端进行联调。

### 文件说明：
文件|说明
---|---
index.html        |入口文件。
package.json      |webpack项目依赖管理文件
webpack.config.js |webpack工程管理【路由、插件、运行、打包】等配置文   

   
   
### 目录说明： 

目录|说明
---|---
src         |工程资源存放目录，包含了【js、css、img、plugins】资源目录
template    | 静态模板目录，存放html格式的文件



### 项目初始化：
1. 将该分支克隆到你的本地
```sh
  $ git clone git@gitlab.smgtech.net:01810266/ihub.git iHub_Admin_H5 --branch iHub_Admin_H5       
```

2. 进入iHub_Admin_H5目录
```sh
  $ cd iHub_Admin_H5
```

3. 安装项目依赖（这个过程有点慢慢，请耐心等待，安装完成后会新增一个名为：node_modules的目录）
```sh
  $ npm install
```

4. 运行项目（默认运行地址：http://localhost:8080/）
```sh
  $ npm start
```


5. 项目生成（打包后的代码会新增一个名为：static的目录）
```sh
  npm rum build
```

6. 要在本地看效果，请启动本地服务如：用phpStudy工具，将站点目录指到iHub_Admin_H5这个目录即可。




>  穆贵林
>  2019年05月30日











