import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import * as PaginationActions from './actions';
//import {queries} from  '../../utils';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class Pagination extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: props.pagination.page,
            totalPages : 0,
            pagination:props.pagination
        }
    }

    componentWillReceiveProps(nextProps){
        const {pagination} = nextProps,
              self = this;

              // Init the state
        self.runStateUpdate(pagination);
        this.startComputation();
    }

    componentDidMount(){
        const {pagination} = this.props,
              self = this;

              // Init the state
        self.runStateUpdate(pagination);
        this.startComputation();
    }

    /**
     * Listens for list changes to update the current page data
     */
    startComputation(){
        const self = this;

        const runPagingComputation = (self)=>{
            const {config,pagination} = self.props,
                  totalPages = Math.ceil(pagination.total / pagination.take);
            let currentPage = 1;

            // Make current page
            if(isFinite(pagination.skip / pagination.take)){
                switch(Math.floor((pagination.skip / pagination.take))){
                    case 0://Skip was zero = page 1
                        currentPage = 1;
                        break;
                    case 1://skip is same as take = page 2
                        currentPage = 2;
                        break;
                    default:
                        currentPage = Math.floor((pagination.skip / pagination.take)) + 1;
                        break;
                }
            }

            //page === 1 ? 0 : page * (this.state.pagination.take) - this.state.pagination.take,

            // Handle busted query strings. Happens when the last query to set the url had more results
            // than the current query. Can happen when result amounts change as well.
            if(currentPage > totalPages){
                currentPage = 0;
                self.writeQueryStringToURL(`?skip=0&take=${pagination.take}&page=1`);
            }

            self.setState({
                pagination,
                totalPages,
                currentPage,
            });
        };

        runPagingComputation(self);

        document.addEventListener('renderToStore', function(e) {
            runPagingComputation(self);
        });
    }

    /**
     * Closure to handle setting state
     * @param pagination
     */
    runStateUpdate(pagination){
        const totalPages = Math.ceil(pagination.total / pagination.take),
              currentPage = isFinite(pagination.total / pagination.skip) ? Math.ceil((pagination.total / pagination.skip)) : 1;

        this.setState({
            pagination,
            totalPages,
            currentPage
        });
    }

    handleClick(e){
        let page = 1;

        switch(e.currentTarget.getAttribute('data-action')){
            case 'first':
                break;
            case 'prev':
                page = this.state.currentPage === 1 ? 1 : this.state.currentPage - 1;
                break;
            case 'next':
                page = this.state.currentPage === this.state.totalPages ? this.state.totalPages : this.state.currentPage + 1;
                break;
            case 'last':
                page = this.state.totalPages;
                break;
        }

        const calculatedSkip = page === 1 ? 0 : page * (this.state.pagination.take) - this.state.pagination.take,
              event = {
                  skip:calculatedSkip,
                  take: this.state.pagination.take,
                  page
              };

        if(this.state.currentPage !== page){
            this.sendEvent(event)
                .writeQueryStringToURL(`?skip=${event.skip}&take=${event.take}&page=${event.page}`);
        }

        this.setState({currentPage : page});
    }

    /**
     * Data binding to the input for manual page value entry
     * @param e
     */
    handleInputChange(e){
        const page = e.currentTarget.value;

        if(page <= this.state.totalPages && page > 0){
            this.setState({currentPage : page});
        }else{
            this.setState({currentPage : this.state.currentPage});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const page = document.getElementById('dl__pagination__currentPage').value,
              calculatedSkip = page === 1 ? 0 : page * (this.state.pagination.take) - this.state.pagination.take,
              event = {
                  skip:calculatedSkip,
                  take: this.state.pagination.take,
                  page
              };

        if(page <= this.state.totalPages){
            this.sendEvent(event)
                .writeQueryStringToURL(`?skip=${event.skip}&take=${event.take}&page=${event.page}`);
        }
    }

    handleBlur(e){
        const page = e.currentTarget.value,
              calculatedSkip = page === 1 ? 0 : page * (this.state.pagination.take) - this.state.pagination.take;

        let event = {
          skip:calculatedSkip,
          take: this.state.pagination.take,
          page
        };

        if(page <= this.state.totalPages){
            this.sendEvent(event)
                .writeQueryStringToURL(`?skip=${event.skip}&take=${event.take}&page=${event.page}`)
                .setState({currentPage : page});
        }else{
            this.setState({currentPage : this.state.totalPages});
        }
    }

    /**
     * Send the change event
     * @param e
     */
    sendEvent(e){
        const {config,updatePagination} = this.props,
            eventData = Object.assign({},e,{id:`dl__items__${config.id}`});

        // Dispatch the redux event before the DOM evt
        updatePagination({pagination:eventData});

        // Broadcast the change event, Listeners: App/index.js _initPagination() & the redux store via dispatch
        var elem = document,
            event = elem.createEvent('Event');
        event.initEvent('paginationChange', true, true);
        event.data = eventData;
        document.dispatchEvent(event);

        return this;
    }

    /**
     * Gets the pagination specific hash properties and converts to an obj for digestion
     */
    readHashProps(){
        return _.pick(this.parseParms(window.location.href.split('?')[1]),['skip','take','page']);
    }

    /**
     * From: http://stackoverflow.com/questions/23481979/function-to-convert-url-hash-parameters-into-object-key-value-pairs
     * @param str
     * @returns {{}}
     */
    parseParms(str='') {
        var pieces = str.split("&"), data = {}, i, parts;
        // process each query pair
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return data;
    }

    /**
     * Handles writing to the url if selected by config
     * @param queryString
     */
    writeQueryStringToURL(queryString){
        const {pagination} = this.props,
              self = this,
              path = window.location.href.split('?')[0].split(window.location.host)[1];//@todo check if this works on production

        // The delay is import for handling what looks like a conflict with Meteor's iron-router
        //@todo may be able to remove this from filterSort component not in a Meteor site
        setTimeout(function () {
            history.replace(path + queryString + '&' + self.getExistingQueryParams());
        }, 1000);


        return this;
    }

    /**
     * Gets the pagination query params from the url to preserve them on write
     */
    getExistingQueryParams(){
        const params = _.omit(this.parseParms(window.location.href.split('?')[1]),['skip','take','page',""]);
        let str = '';

        for(let key in params){
            str += `${key}=${params[key]}&`
        }

        return str === '=&' ? '' : str.slice(0, -1);// removes the last ampersand
    }

    render(){
        const {config,bottom} = this.props,
              classNames = config.pinPagination ? 'dl__pagination dl__pinPagination' : 'dl__pagination';

        return (
            <div className={classNames} style={{bottom}}> 
                <div className="dl__pagination__wrapper">
                    <div className="dl__pagination__first" data-action="first" onClick={this.handleClick.bind(this)}></div>
                    <div className="dl__pagination__prev" data-action="prev" onClick={this.handleClick.bind(this)}></div>
                    <div className="dl__pagination__indicator">
                        <span>Page&nbsp;</span>
                        <form id="dl__pagination__pageForm" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text" id="dl__pagination__currentPage" value={this.state.currentPage} onChange={this.handleInputChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
                        </form>
                        <span>&nbsp;of</span>
                        <span>{this.state.totalPages || 'loading...'}</span>
                    </div>
                    <div className="dl__pagination__next" data-action="next" onClick={this.handleClick.bind(this)}></div>
                    <div className="dl__pagination__last" data-action="last" onClick={this.handleClick.bind(this)}></div>
                </div>
            </div>
        )
    }
}

//Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state,ownProps) {
    return {
        config:state.app.config,
        pagination : state.app.pagination,
        force : state.app.force
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(PaginationActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);