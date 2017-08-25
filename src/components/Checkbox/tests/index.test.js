import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Checkbox>
        {children}
      </Checkbox>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
