import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Emoji } from './index';
import defaultSVGUrl from './smile.svg';

const emojiSVGUrlDummy = "/test/emoji/url/smiley.svg";


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Emoji />, div);
});

it('renders emoji icon from background image from default prop', () => {
  const { getByTestId  } = render(<Emoji />);
  expect(getByTestId('emoji-svg-url')).toHaveStyle(`background-image: url(${defaultSVGUrl})`);
});


it('renders emoji icon from background image', () => {
  const { getByTestId  } = render(<Emoji emojiSVGUrl={emojiSVGUrlDummy} />);
  expect(getByTestId('emoji-svg-url')).toHaveStyle(`background-image: url(${emojiSVGUrlDummy})`);
});