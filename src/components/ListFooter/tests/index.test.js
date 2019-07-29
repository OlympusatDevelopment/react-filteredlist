import React from 'react';
import { shallow } from 'enzyme';

import ListFooter from '../index';

describe('<ListFooter />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <ListFooter>
        {children}
      </ListFooter>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
