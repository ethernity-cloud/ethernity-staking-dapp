import React from 'react';
import useTheme from '../hooks/useTheme';

const Logo = () => {
  const { theme, THEME_LIGHT } = useTheme();

  return (
    <div className="flex items-center justify-center h-16">
      <svg
        width={40}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 110"
        xmlSpace="preserve"
      >
        <g>
          <path
            id="main"
            fill={theme === THEME_LIGHT ? '#0C86FF' : '#ffffff'}
            d="M200,46.3h-14.1c-1.3-4.1-4-9-7.7-12.9C166.6,21.7,147.7,22,136,33.7L84.2,86.1l0,0
		c-16,17.2-44.2,17.2-61.2,0.1l0.1,0.1C16.3,79.4,12.3,70.9,10.9,62H0V48.2h10.9c1.4-8.9,5.4-17.5,12.2-24.4l0,0
		c13.6-13.7,34-16.4,50.2-8.1l2.9-2.8l0,0c14.7-15.8,39.6-17,56.8-3.8c-4.3,2.3-8.3,5.4-11.9,8.9c-11.3-6.5-25.9-5-35.5,4.8
		l-10.7,11l0,0l0,0l0,0c-11.6-11.7-30.4-11.7-42,0c-4,4.1-6.7,9.1-7.9,14.4h29.6l0.1,13.8H25.1C26.3,67.2,29,72,33,76.2
		c11.6,11.7,30.5,11.7,42.1,0l51.8-52.4l0,0c16-17.1,44.2-17.3,61.2-0.2v-0.1C194.5,30.1,198.4,38.1,200,46.3z"
          />
          <path
            id="accent"
            fill="#0C86FF"
            d="M200,62.5c-1.6,9.4-5.5,16.8-12,23.3c-13.6,13.8-34,16.8-50.3,8.5l-2.9,2.8l0,0
		c-14.7,15.8-39.6,17-56.8,3.8c4.3-2.3,8.3-5.4,11.9-8.9c11.3,6.5,25.9,5,35.5-4.8l1.1-1.1l9.6-10c11.6,11.7,30.4,11.6,42-0.1v-0.2
		c3.7-3.7,6.3-8.1,7.6-13.5H200V62.5z"
          />
        </g>
      </svg>

      <span className="font-bebas-neue text-center text-xl font-bold text-etny-500 dark:text-white pl-2">
        Ethernity Cloud
      </span>
    </div>
  );
};

export default Logo;
