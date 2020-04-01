// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const vscode = require('vscode');
const DataProvider = require('./dataProvider');
const fs = require('fs');
const path = require('path');
var hljs = require('highlight.js'); // https://highlightjs.org/
var md = require('markdown-it')({
    html: true, 
    linkify: true,        // Autoconvert URL-like text to links
    typographer:true,
    highlight: function (str,lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang,str,true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

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
        "disabled",
        "dependencies",

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
        "initialValues",

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
        "locInfo",

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
        "noStyle",

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
        "parent",


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
            'qnnWelcome', // viewType
            "欢迎来到qnn", // 视图标题
            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            {
                enableScripts: true, // 启用JS，默认禁用
            }
        );
        let global = { panel };

        panel.webview.html = getWebviewContent();
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
    // vscode.commands.executeCommand('extension.demo.showWelcome');

    let panel = null;
    vscode.commands.registerCommand('qnnDoc.start',(params) => {
        console.log('params',params)
        // Create and show a new webview
        panel = vscode.window.createWebviewPanel(
            "QnnForm", // Identifies the type of the webview. Used internally
            'qnn 说明文档', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {} // Webview options. More on these later.
        );

        panel.webview.html = getWebviewContent();


        function getWebviewContent() {
            const mdF = fs.readFileSync(path.join(__dirname,`docs/${params}.md`));
            const mdstr = md.render(`${mdF}`);
            return `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Cat Coding</title>
          </head>
          <body>  
            ${mdstr}
            </body>
          </html>`;
        }
    })

    // qnn帮助文档 
    vscode.window.registerTreeDataProvider("qnnReadmepages",new DataProvider());
    vscode.commands.registerCommand('tree.open',(node) => {
        let type = node.label;
        DataProvider.openDoc(type,panel,context)
    })


}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }


function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
  </head>
  <body style="text-align:center;padding-top:100px;background:url('https://github.com/wangzongming/qnn/blob/master/imgs/field2.gif?raw=true')no-repeat -100px -10px / cover">   

        <!--蒙层-->
        <div style="position:absolute;z-index:-1;left:0px;top:0px;right:0px;bottom:0px;background:rgba(51, 51, 51, 0.5);width:100%;height:100%"></div>      
        
        <h1>版本：v1.0.0</h1>  
        <h4>优化插件并且加入文档说明 </h4>
         

        <h4><a href="https://marketplace.visualstudio.com/items?itemName=xm.qnn">☞ 帮助文档</a></h4>
        <h4><a href="./CHANGELOG.md">☞ 升级日志</a></h4>
        <h6>apih5 · qnn</h6>

        <script> 
        
        </script>
  </body>
  </html>`;
}


module.exports = {
    activate,
    deactivate
}
