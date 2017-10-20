import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TextItemActions from './actions';
import utils,{makeHumanDate} from '../../utils';
import copy from 'copy-to-clipboard';
import Checkbox from '../Checkbox';

class TextItem extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    copyToClipboard(val){
        copy(val);

        this.props.config.notify(`Copied ${val} to the clipboard`,'success','br');
    }

    onLinkClick(e){
        // Prevent linking when the copy icon is clicked
        if(e.target.classList.contains('dl__textItem-item--copy')){
            e.preventDefault();
        }
    }

    onChecked(e){
        const {updateWorkspace,item,config,workspaceItems} = this.props,
              state = e.target.checked,
              workspaceAction = state ? 'add' : 'remove';

        if(state){
            updateWorkspace({
                Item: config.hooks.onCheck({item,workspaceItems}),
                workspaceAction
            });
        }else{
            updateWorkspace({
                Item:config.hooks.onUnCheck({item,workspaceItems}),
                workspaceAction
            });
        }
    }

    renderHTML(html){ 
        return (<span dangerouslySetInnerHTML={{__html: html}} title={html}></span>);
    }

    render() {
        const {item,selectedView, preferencedProps} = this.props;
        const props = preferencedProps,
            check = selectedView.enableRowChecks ? (
                <span key={-1} style={{width:'33px'}} className="dl__textItem-item">
                    <Checkbox onChecked={this.onChecked.bind(this)} id={item[selectedView.itemIdProp]}> </Checkbox>
                </span>) : '';

        return (
            <div className="dl__textItem">
                <a target={selectedView.link.target} href={selectedView.link.row(item)} onClick={this.onLinkClick.bind(this)}>
                    {check}

                    {
                        props.map(prop=>{
                            const id = item[prop.idKey],
                                  val = item[prop.key],
                                  hookedVal = prop.hasOwnProperty('before') ? prop.before(val,item) : val,
                                parsedVal = prop.isDate ? makeHumanDate(hookedVal) : this.renderHTML(hookedVal),
                                copyIcon = prop.hasCopy ? (<span className="dl__textItem-item--copy" onClick={this.copyToClipboard.bind(this,parsedVal)}> </span>) : '';

                            if(prop.display){
                                return (<span key={prop.key} data-id={id} style={{width:prop.width}} className="dl__textItem-item" >{copyIcon}{parsedVal}</span>);
                            }
                        })
                    }
                </a>
            </div>
        );
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        workspaceItems : state.app.workspaceItems,
        force: state.app.force,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(TextItemActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextItem);