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

    onSortClick(e){
        const asc = !this.state.asc;

        if(!e.target.classList.contains('dl__sortItem--clear')){
          this.setState({asc});
          this.props.onClick(asc ? 'asc' : 'desc');
        }else{
          // Handle the clear button click
          this.props.onClick(null);
        }
    } 

    render() { 
        const {options,selectedView,onClick} = this.props;
        const orderClass = (options.value === null ? true : (options.value === 'asc')) ? 'dl__sortItem--asc' : 'dl__sortItem--desc';
        const clearSort = options.value ? (<span className="dl__sortItem--clear"></span>) : '';

        return (
            <li className="dl__sortItem" onClick={this.onSortClick}>
              <span></span> 
                <span>{utils.propToTitleCase(options.id.split('-')[1])}</span>
                {clearSort}
                <span className={orderClass}></span>
            </li>
        );
    }
}
