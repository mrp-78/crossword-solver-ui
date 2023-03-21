import React from 'react';
import style from './LinkButton.module.scss';
import Link from 'next/link';

interface LinkButtonProps {
  text: string;
  href: string;
  theme: 'filled' | 'outline';
}

const LinkButton = ({text, href, theme}: LinkButtonProps) => {
  return (
    <Link href={href} className={`${style.linkButton} ${style[theme]}`}>
      {text}
    </Link>
  );
};
export default LinkButton;
