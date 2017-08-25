import React from 'react';
import { shallow } from 'enzyme';

import Search from '../index';

describe('<Search />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Search>
        {children}
      </Search>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
