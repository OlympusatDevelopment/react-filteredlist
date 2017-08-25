import React, { Component } from 'react';
import utils from '../../utils';

export class SortItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // Convert asc/desc to boolean for easy toggling
            asc : props.options.value === null ? true : (props.options.value === 'asc')
        };

        this.onSortClick = this.onSortClick.bind(this);
    }

    onSortClick(){
        const asc = !this.state.asc;

        this.setState({asc});
        this.props.onClick(asc ? 'asc' : 'desc');
    }

    render() {
        const {options,selectedView,onClick} = this.props;
        const orderClass = (options.value === null ? true : (options.value === 'asc')) ? 'dl__sortItem--asc' : 'dl__sortItem--desc';

        return (
            <li className="dl__sortItem" onClick={this.onSortClick}>
                <span>{utils.propToTitleCase(options.id.split('-')[1])}</span>
                <span className={orderClass}></span>
            </li>
        );
    }
}
