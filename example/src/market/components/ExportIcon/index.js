import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class ExportIcon extends Component {
    constructor(props) {
        super(props)
    }

    iconClick(){
        alert('on export icon click');
    }

    render() {

        return (
            <div key={Math.random()*100000} title="Export" className="exportIcon" onClick={this.iconClick.bind(this)}>
                <FontAwesome name='cloud-download' />
            </div>);
    }
}

export default ExportIcon; 