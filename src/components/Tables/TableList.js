import React from "react";
import {ButtonSubmit as Button} from "../Buttons";
import PropTypes from 'prop-types';
import {SORTS} from '../../constants';
import classNames from 'classnames';

const Sort = ({sortKey, onSort, children, activeSortKey}) => {
    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey}
    );

    return (
        <Button onClick={() => onSort(sortKey)} className={sortClass} >
            {children}
        </Button>
    )
};

const Table = ({list, onDismiss, sortKey, onSort, isSortReverse}) => {
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (<div className='table'>
        <div className='table-header'>
            <span style={{width: '40%'}}>
                <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
                    Title
                </Sort>
            </span>
            <span style={{width: '30%'}}>
                <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>
                    Author
                </Sort>
            </span>
            <span style={{width: '10%'}}>
                <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>
                    Comments
                </Sort>
            </span>
            <span style={{width: '10%'}}>
                <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>
                    Points
                </Sort>
            </span>
            <span style={{width: '10%'}}>
                Archive
            </span>
        </div>

        {reverseSortedList.map(item =>
            <div key={item.objectID} className='table-row'>
                <span style={{width: '40%'}}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={{width: '30%'}}>{item.author}</span>
                <span style={{width: '10%'}}>{item.num_comments}</span>
                <span style={{width: '10%'}}>{item.points}</span>
                <span style={{width: '10%'}}>
                    <Button onClick={() => onDismiss(item.objectID)} className='button-inline'>
                        Dismiss
                    </Button>
                </span>
            </div>
        )}
    </div>);
};

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
};
export default Table;