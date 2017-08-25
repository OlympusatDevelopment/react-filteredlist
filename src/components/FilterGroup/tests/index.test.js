import React from 'react';
import { shallow } from 'enzyme';

import FilterGroup from '../index';

describe('<FilterGroup />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <FilterGroup>
        {children}
      </FilterGroup>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
