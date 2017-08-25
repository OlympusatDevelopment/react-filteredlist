import React, { Component } from 'react';

export default class Checkbox extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props)
    }

    render() {
        const {onChecked,id,checked} = this.props;
        //onChange={(e)=>{console.log('changed /in Checkbox/index.js',this,e)}}
        return (
            <div className="dl__checkbox">
                <input type="checkbox" name={id} checked={checked} onClick={(e)=>{onChecked(e,id)}}/>
            </div>
        );
    }
}