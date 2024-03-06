import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link.jsx';

it('changes the class when hovered', () => {
  const component = renderer.create(
<<<<<<< HEAD
    <Link page="http://www.facebook.com">Facebook</Link>
=======
    <Link page="http://www.facebook.com">Facebook</Link>,
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
