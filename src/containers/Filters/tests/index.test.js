import React from 'react';
import { shallow } from 'enzyme';

import Filters from '../index';

describe('<Filters />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Filters>
        {children}
      </Filters>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
