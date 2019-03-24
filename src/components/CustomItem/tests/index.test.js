import React from 'react';
import { shallow } from 'enzyme';

import CustomItem from '../index';

describe('<CustomItem />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <CustomItem>
        {children}
      </CustomItem>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
