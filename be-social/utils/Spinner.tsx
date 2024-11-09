import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const [spinnerChar, setSpinnerChar] = useState('_');
  const spinnerChars = ['0','D','O'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerChar((prevChar) => {
        const nextIndex = (spinnerChars.indexOf(prevChar) + 1) % spinnerChars.length;
        return spinnerChars[nextIndex];
      });
    }, 200); // Adjust the interval speed as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return <span className="inline-block">{spinnerChar}</span>;
};

export default Spinner;
