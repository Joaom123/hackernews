import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, {updateSearchTopStoriesState} from './components/App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FormSearch} from './components/Forms';
import {TableList} from './components/Tables';
import {ButtonSubmit} from './components/Buttons';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
  it('should renders without crashing', function () {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FormSearch', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormSearch>Search</FormSearch>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<FormSearch>Search</FormSearch>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ButtonSubmit', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonSubmit>More</ButtonSubmit>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<ButtonSubmit>More</ButtonSubmit>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('TableList', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
  };

  it('shows two items in list', () => {
    const element = shallow(<TableList {...props}/>);
    expect(element.find('.table-row').length).toBe(2);
  });

  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableList { ...props } />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<TableList { ...props } />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('updateSearchTopStoriesState', () => {
  const prevState = {
    results: {
      test: {
        hits: [{title: 'a'}, {title: 'b'}],
        page: 0
      }
    },
    isLoading: true,
    searchKey: 'test',
  };

  const expectedStateChange = {
    results: {
      test: {
        hits: [{title: 'a'}, {title: 'b'}, {title: 'a'}, {title: 'b'}],
        page: 1
      }
    },
    isLoading: false,
  };

  it('update top stories', () => {
    expect(updateSearchTopStoriesState([{title: 'a'}, {title: 'b'}], 1)(prevState)).toEqual(expectedStateChange);
  });

});