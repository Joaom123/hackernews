import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './components/App';
import {FormSearch} from './components/Forms';
import {TableList} from './components/Tables';
import {ButtonSubmit} from './components/Buttons';

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
  };

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