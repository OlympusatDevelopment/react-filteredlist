import React, { Component } from 'react';

export default class Checkbox extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
          isChecked: false,
        };

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      const prevProps = state.prevProps || {};
      // Compare the incoming prop to previous prop
      const isChecked =
        prevProps.isChecked !== props.checked
          ? props.checked
          : state.isChecked;
      return {
        // Store the previous props in state
        prevProps: props,
        isChecked,
      };
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.checked !== prevProps.checked) {
        this.setState(({ isChecked }) => ({
          isChecked: isChecked
        }
      ));
      }
    }

    handleOnClick(e) {
      const check = e.target.getElementsByTagName('input')[0];

      if (check && check.type == "checkbox") {
        check.checked = !check.checked;
        this.setState({ isChecked: !this.state.isChecked});
        this.props.onChecked({target: { checked: check.checked}}, this.props.id);
      }
    }

    handleOnChange(e) {
      this.setState(({ isChecked }) => ({
        isChecked: !isChecked,
      }));
      this.props.onChecked(e, this.props.id);
    }

    render() {
        const {id} = this.props;
        const { isChecked } = this.state;
        //onChange={(e)=>{console.log('changed /in Checkbox/index.js',this,e)}}
        return (
            <div className="dl__checkbox" onClick={this.handleOnClick}>
                <input type="checkbox" name={id} defaultChecked={isChecked} onChange={this.handleOnChange} />
            </div>
        );
    }
}