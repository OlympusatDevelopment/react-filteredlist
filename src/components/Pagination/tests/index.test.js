import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../index';

describe('<Pagination />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Pagination>
        {children}
      </Pagination>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
