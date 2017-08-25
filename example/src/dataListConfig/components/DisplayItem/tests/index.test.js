import React from 'react';
import { shallow } from 'enzyme';

import DisplayItem from '../index';

describe('<DisplayItem />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <DisplayItem>
        {children}
      </DisplayItem>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
