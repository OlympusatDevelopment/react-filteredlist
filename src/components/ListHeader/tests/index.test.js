import React from 'react';
import { shallow } from 'enzyme';

import ListHeader from '../index';

describe('<ListHeader />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <ListHeader>
        {children}
      </ListHeader>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
