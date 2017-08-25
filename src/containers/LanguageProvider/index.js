import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store';
import * as LanguageProviderActions from './actions';
import { IntlProvider } from 'react-intl';

class LanguageProvider extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <IntlProvider locale={this.props.locale} key={this.props.locale} messages={this.props.messages[this.props.locale]}>
          {React.Children.only(this.props.children)}
        </IntlProvider>
    );
  }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
  return {
    languageProvider : state.languageProvider
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LanguageProviderActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageProvider);