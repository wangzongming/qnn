// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */
function provideCompletionItems(document,position,token,context) {

    const dependencies = [
        //a
        "antd",
        "actionBtns",
        "actionBtnsPosition",


        //b

        //c
        "componentsKey",

        //d
        "drawerConfig",
        "DrawerShow",
        "desc",
        "data",
        "drawerConfig",
        "diyTableRow",


        //e

        //f
        "form",
        "formConfig",
        "fetchConfig",
        "firstRowIsSearch",
        "fieldsValueChange",
        "formFetchConfig",
        "formFetchConfig",
        "formContainerLayoutLeftAndRright",
        "formContainerOnScroll",
        "formItemLayout",
        "formItemLayoutSearch",
        "formIsChangeedAlertModalType",
        "formIsChangeedAlertTextContent",


        //g
        "getRowSelection",


        //h
        "headers",
        "history",

        //i
        "method",
        "isNeedClassifyData",
        "isNeedClassifyDataCb",
        "isShowRowSelect",
        "infoAlert",
        "isInForm",
        "isInTable",
        "isInSearch",

        //g
        "getBackEndConfig",

        //k

        //l
        "layout",
        "limit",
        "curPage",
        "labelConfig",

        //m
        "match",
        "myFetch",
        "method",
        "mobileListItem",
        "mobileItemClick",
        "maskClosable",
        "mobileModel",


        //n

        //o

        //p
        "paginationConfig",


        //q
        "QnnTable",

        //r
        "rowKey",

        //s
        "searchFormColNum",

        //t
        "tabs",
        "title",
        "titleStyle",
        "table",


        //u

        //v

        //w
        "wrappedComponentRef",

        //x

        //y

        //z

    ];
    return dependencies.map(dep => {
        // vscode.CompletionItemKind 表示提示的类型 
        return new vscode.CompletionItem(dep,vscode.CompletionItemKind.Field); 
    });
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item 
 * @param {*} token 
 */
function resolveCompletionItem(item,token) {
    return null;
}



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "qnn" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.helloWorld',function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);


    // 注册代码建议提示，只有当按下“.”时才触发
    let foo = vscode.languages.registerCompletionItemProvider('javascript',{
        provideCompletionItems,
        resolveCompletionItem
    });
    context.subscriptions.push(foo);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
