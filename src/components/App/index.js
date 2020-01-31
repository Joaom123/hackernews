import React, {Component} from 'react';
import axios from 'axios';
import './index.css';
import {TableList as Table} from '../Tables';
import {ButtonSubmit as Button} from '../Buttons';
import {FormSearch as Search} from '../Forms';

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from '../../constants';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);

    }

    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [searchKey]:{ hits: updatedHits, page }
            }
        });
    }

    onSearchSubmit(event) {
        event.preventDefault();
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});

        if (this.needsToSearchTopStories(searchTerm)) this.fetchSearchTopStories(searchTerm);
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    setSearchTopStories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }

    fetchSearchTopStories(searchTerm, page = 0){
        axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(result => this.setSearchTopStories(result.data))
            .catch(error => this.setState({error}));
    }

    render() {
        const { searchTerm, results, searchKey, error } = this.state;

        const page = ( results && results[searchKey] && results[searchKey].page ) || 0;

        const list = ( results && results[searchKey] && results[searchKey].hits) || [];

        return (
            <div className="page">
                <div className='interactions'>
                    <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
                        Search
                    </Search>
                </div>
                {
                    error
                        ? <div className='interactions'><p>Something went wrong!</p></div>
                        :<Table list={list} onDismiss={this.onDismiss}/>
                }
                <div className='interactions'>
                    <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }
}

export default App;