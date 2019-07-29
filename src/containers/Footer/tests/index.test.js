import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';

describe('<Footer />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Footer>
        {children}
      </Footer>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
