import React from 'react';
import { shallow } from 'enzyme';

import FilterItem from '../index';

describe('<FilterItem />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <FilterItem>
        {children}
      </FilterItem>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
