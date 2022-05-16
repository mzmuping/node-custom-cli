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

        fs.readdir(temlDir, (err, files) => {
            if (err) throw err
            files.forEach(file => {
                ejs.renderFile(path.join(temlDir, file), answers, (err, result) => {
                    if (err) throw err
                    fs.writeFileSync(path.join(destDir, file), result);
                });
            })
        })

    })