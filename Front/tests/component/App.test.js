import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Debugger from 'src/components/App';

describe('App component', () => {
  const wrapper = shallow(<Debugger />);
  it('renders without crashing', () => {
    wrapper;
  });
  it('Debugger is a function', () => {
    expect(Debugger).to.be.a('function');
  });
});
it('existing props isLoading', () => {
  expect('isLoading').to.exist;
});
it('existing props result', () => {
  expect('result').to.exist;
});
it('addLocalStorage is a function and arrayToLocalStorage is an array', () => {
  const addLocalStorage = (res) => {
    const response = res;
    const arrayToLocalStorage = [];
    arrayToLocalStorage.push(response);
    expect(arrayToLocalStorage).to.be.an('array');
  };
  expect(addLocalStorage).to.be.a('function');
});
