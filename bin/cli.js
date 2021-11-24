#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

// 配置 config 命令
// program.command("config [value]")
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 UI 命令
program
  .command("ui")
  .description("start add open ifcloud-cli ui")
  .option("-p, --port <port>", "Port used for  the UI Server")
  .action((option) => {
    console.log(option);
  });

program
  // 定义命令和参数
  .command("create <app-name>")
  // 命令描述
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 打印结果
    // console.log("name: ", name, "options", options);
    // 在 create.js 中执行创建任务
    require("../lib/create")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program.on("--help", () => {
  // 新增 说明信息
  console.log(
    `\r\nRun ${chalk.cyan(
      `ifcloud <command> --help`
    )} for detailed usage of given command.\r\n`
  );
});

program.on("--help", () => {
  // 使用 figlet 回执 Logo
  console.log(
    "\r\n" +
      figlet.textSync("ifcloud", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(
    `\r\nRun ${chalk.cyan(`ifcloud <command> --help`)} show details\r\n`
  );
});

// 解析用户执行命令传入的参数
program.parse(process.argv);
