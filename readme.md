步骤：
1. 创建项目 sample-cli
2. yarn init // 创建package.json
3. 创建cli.js // 填写下面文件
```js
#!/usr/bin/env node
// Node CLI 应用入口文件必须要有这样文件头
// 如果是linux 或者 macOS 系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改
console.log('cli is run ')
```
4. 在package.json 添加
```
{
"bin": "cli.js",
}
```
5. yarn link // 挂载全局
6. 测试=》 在新文件夹 cmd 中入sample-cli

结果：
![](./images/cli_1.png)

上图node cli就跑起来了

下面我们添加一个创建基本模板文件

先按照依赖：
```js
yarn add inquirer -D
yanr add ejs -D
```
代码实现
```js
#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样文件头
// 如果是linux 或者 macOS 系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件
const inquirer = require('inquirer')
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
    .then(answers => {
        //根据用户回答的结果生成文件

        //模板目录
        const temlDir = path.join(__dirname, 'templates');

        //目标目录
        const destDir = process.cwd();
        //读取文件
        fs.readdir(temlDir, (err, files) => {
            if (err) throw err
            files.forEach(file => {
                //ejs 替换用户交互内容
                ejs.renderFile(path.join(temlDir, file), answers, (err, result) => {
                    if (err) throw err;
                    //输出模板到目标目录
                    fs.writeFileSync(path.join(destDir, file), result);
                });
            })
        })

    })
```