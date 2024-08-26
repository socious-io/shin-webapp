import React, { useState, useEffect } from 'react';
import { convertMarkdownToJSX } from 'src/core/helpers/convert-md-to-jsx';

import css from './index.module.scss';
import { ExpandableTextProps } from './index.types';
import TextClickableURLs from '../TextClickableUrls';

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  seeMoreText = 'see more',
  expectedLength = 200,
  clickableUrls = true,
  isMarkdown = false,
  seeMoreButton = true,
  customStyle = '',
}) => {
  const initialText = text.length > expectedLength ? text.slice(0, expectedLength) + '...' : text;
  const [mainText, setMainText] = useState(text);
  const expect = text.slice(0, expectedLength);
  const viewMoreCondition = expect.length < text.length;
  const [shouldViewMore, setShouldViewMore] = useState(viewMoreCondition);

  const toggleExpect = (): void => {
    if (mainText !== text) {
      setMainText(text);
    } else {
      setMainText(initialText);
    }
    setShouldViewMore(!shouldViewMore);
  };

  useEffect(() => {
    setShouldViewMore(viewMoreCondition);
    setMainText(expect);
  }, [text]);

  useEffect(() => {
    const newText = text.length > expectedLength ? text.slice(0, expectedLength) + '...' : text;
    setShouldViewMore(text.length > expectedLength);
    setMainText(newText);
  }, [text, expectedLength]);

  const renderText = () => {
    if (clickableUrls && !isMarkdown) {
      return <TextClickableURLs text={mainText} />;
    } else if (isMarkdown) {
      return convertMarkdownToJSX(mainText);
    }
    return mainText;
  };

  return (
    <div className={`${css.expect} ${customStyle}`}>
      {renderText()}
      {seeMoreButton && shouldViewMore && (
        <span className={css.expect__seeMore} onClick={toggleExpect}>
          {seeMoreText}
        </span>
      )}
    </div>
  );
};

export default ExpandableText;
