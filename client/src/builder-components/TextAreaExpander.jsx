import React, { useRef } from 'react';

function TextAreaExpander() {
  const textareaRef = useRef(null);

  const handleExpand = () => {
    // Get the number of lines in the textarea
    const lines = textareaRef.current.value.split('\n').length;

    // Set the rows attribute to the number of lines
    textareaRef.current.rows = lines;
  };

  return (
    <textarea ref={textareaRef} onChange={handleExpand} />
  );
}

export default TextAreaExpander;