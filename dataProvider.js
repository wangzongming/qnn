const vscode = require('vscode');
const { TreeDataProvider,Event,TreeItem,TreeItemCollapsibleState,EventEmitter } = vscode;

class DataProvider {
    constructor() {
        this.data = [
            // new DataItem('line1',[new DataItem('line1-sub1'),new DataItem('line1-sub2')]), 
            new DataItem('qnn'),
            new DataItem('QnnForm'),
            new DataItem('QnnTable'),
            new DataItem('pullperson'),
            new DataItem('pullpersonMobile'),
            new DataItem('tree'),
            new DataItem('treeV2'),
            new DataItem('workFlow'),
        ];

    }
    static openDoc = (type) => {
        console.log('tree open',type) 
 
        vscode.commands.executeCommand('qnnDoc.start', type); 
    }
    getTreeItem(element) {
        element.command = element.collapsibleState == TreeItemCollapsibleState.None ? {
            command: 'tree.open',
            arguments: [element],
            title: 'Open'
        } : void 0;
        return element;
    }

    getChildren(element) {
        if (element === undefined) {
            vscode.commands.executeCommand('qnnDoc.start', 'qnn'); 
            return this.data;
        } 
        return element.children;
    }

}


class DataItem extends TreeItem {
    constructor(label,children) {
        super(label,children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Collapsed);
        this.children = children;
    }
}
module.exports = DataProvider