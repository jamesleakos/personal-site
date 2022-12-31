import React, { useRef } from 'react';

function TextAreaExpander({ value, setText }) {
  const textareaRef = useRef(null);

  const onEnterText = (text) => {   
    // first lets pass the changed text back up
    setText(text);

    // then we'll see if we need to expand the box
    // Get the number of lines in the textarea
    const lines = textareaRef.current.value.split('\n').length;

    // Set the rows attribute to the number of lines
    textareaRef.current.rows = lines;
  };

  return (
    <textarea ref={textareaRef} value={value} onChange={(e) => { onEnterText(e.target.value); }} />
  );
}

export default TextAreaExpander;