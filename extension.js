// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/** 
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 * @param {*} context 
 */
function provideCompletionItems(document,position,token,context) {

    //普通提示
    const dependencies = [
        //a
        "antd",
        "actionBtns",
        "actionBtnsPosition",
        "addonBefore",
        "addonAfter",
        "autosize",
        "addends",
        "addShow",
        "addDisabled",


        //b
        "btns",
        "btnCallbackFn",


        //c
        "componentsKey",
        "colWrapperStyle",
        "colStyle",

        //d
        "drawerConfig",
        "DrawerShow",
        "desc",
        "data",
        "drawerConfig",
        "diyTableRow",
        "defaultValue",
        "diyRules",
        "defaultSortOrder",
        "drawerTitle",
        "dataIndex",
        "disabled",


        //e
        "editDisabled",
        "editShow",

        //f
        "form",
        "fetch",
        "field",
        "filter",
        "formatter",
        "formConfig",
        "fetchConfig",
        "firstRowIsSearch",
        "fieldsValueChange",
        "formFetchConfig",
        "formFetchConfig",
        "formContainerOnScroll",
        "formItemLayout",
        "formItemLayoutSearch",
        "formIsChangeedAlertModalType",
        "formIsChangeedAlertTextContent",
        "fieldsConfig",
        "formContainerLayoutLeftAndRright",


        //g
        "getRowSelection",


        //h
        "headers",
        "history",
        "help",

        //i
        "infoAlert",
        "isInForm",
        "isInTable",
        "isInSearch",
        "isUrlParams",
        "initialValue",
        "isCanClick",
        "imgStyle",
        "isInQnnTable",
        "isNeedClassifyData",
        "isNeedClassifyDataCb",
        "isShowRowSelect",
        "isValidate",
        "moment",

        //g
        "getBackEndConfig",

        //k

        //l
        "label",
        "layout",
        "limit",
        "curPage",
        "labelStyle",
        "labelClick",
        "labelConfig",
        "linkageFields",

        //m
        "max",
        "min",
        "match",
        "myFetch",
        "method",
        "message",
        "mobileListItem",
        "mobileItemClick",
        "maskClosable",
        "mobileModel",
        "multiple",


        //n
        "noHaveSearchInput",

        //o
        "offse",
        "oldValue",
        'oldValueKey',
        "offsetSearch",
        "offsetForm",
        "onChange",
        "optionData",
        "optionConfig",

        //p
        "paginationConfig",
        "placeholder",
        "prefix",
        "prefixStyle",
        "precision",
        "pullJoin",


        //q
        "qnnFormContextHeight",

        //r
        "rowKey",
        "required",
        "render",
        "rowData",
        "rowInfo",
        "rows",


        //s
        "searchFormColNum",
        "span",
        "suffix",
        "suffixStyle",
        "sorter",
        "spanForm",
        "spanSearch",
        "selectedRows",
        "searchData",
        "style",
        "showSearch",


        //t
        "tabs",
        "title",
        "titleStyle",
        "table",
        "typeMessage",
        "tdEdit",
        "tdEditCb",
        "tdEditFetchConfig",
        "tooltip",
        "tableFns",
        "type",
        "tabsActiveKey",


        //u
        "upload",

        //v
        "voice",

        //w
        "wrappedComponentRef",

        //x

        //y

        //z

    ];

    //回调方法
    const cbFn = [
        "closeDrawer",
        "download",
        "fetch",
        "msg",
        "parentProps",
        "setSelectedRows",
        "clearSelectedRows",
        "getSelectedRows",
        "openTree",
        "refresh",
        "setActiveKey",
        "getActiveKey",
        "setFormGlobalDisabledStatus",
        "setDrawerBtns",
        "setDrawerBtnsByComponent",
        "setForms",
        "searchForm",
        "setDrawerConfig",
        "getDrawerConfig",
        "deepCopy",
    ];

    return [].concat(dependencies,cbFn).map(dep => {
        // vscode.CompletionItemKind 表示提示的类型 
        if (cbFn.includes(dep)) {
            return new vscode.CompletionItem(dep,vscode.CompletionItemKind.Method);
        }
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


    let attr = vscode.languages.registerCompletionItemProvider('javascript',{
        provideCompletionItems,
        resolveCompletionItem
    });
    context.subscriptions.push(attr);


    //自定义 欢迎页面
    context.subscriptions.push(vscode.commands.registerCommand('extension.demo.showWelcome',function (uri) {
        const panel = vscode.window.createWebviewPanel(
            'testWelcome', // viewType
            "欢迎来到qnn", // 视图标题
            vscode.ViewColumn.Two, // 显示在编辑器的哪个部位
            {
                enableScripts: true, // 启用JS，默认禁用
            }
        );
        let global = { panel };
        panel.webview.html = getWebViewContent(context,'README.md');
        panel.webview.onDidReceiveMessage(message => {
            if (messageHandler[message.cmd]) {
                messageHandler[message.cmd](global,message);
            } else {
                util.showError(`未找到名为 ${message.cmd} 回调方法!`);
            }
        },undefined,context.subscriptions);
    }));

    const key = 'vscodePluginDemo.showTip';
    // 如果设置里面开启了欢迎页显示，启动欢迎页
    vscode.commands.executeCommand('extension.demo.showWelcome');
    // if (vscode.workspace.getConfiguration().get(key)) {
    //     vscode.commands.executeCommand('extension.demo.showWelcome');
    // }


}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
