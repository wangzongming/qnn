import React,{ Component } from 'react';
import QnnForm from 'apih5/modules/qnn-table/qnn-form';
class Page extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <QnnForm
                    fetch={this.props.myFetch}
                    upload={this.props.myUpload}
                    headers={{token: this.props.loginAndLogoutInfo.loginInfo.token}}
                    wrappedComponentRef={(me) => {this.form = me}}
                    method={{   }}
                    componentsKey={{}}
                    formConfig={[  ]}
                />
        </div>)
    }
}
export default Page;