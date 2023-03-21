import React from 'react';
import style from './MainLayout.module.scss';
import headerLinks from './headerLinks';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  const router = useRouter();
  return <div>
    <header className={style.header}>
      <div className={style.brand}>
        <Link href='/'>
          <Image className={style.logo} src={'/crossword.png'} alt="crossword" width={25} height={25} />
          <p className={style.title}>جدول‌باز</p>
        </Link>
      </div>
      <div className={style.links}>
        {headerLinks.map(link =>
            <Link key={link.href} href={link.href} className={`${style.navLink} ${router.pathname === link.href && style.selected}`}>
              {link.title}
            </Link>
        )}
      </div>
      <div></div>
    </header>
    <div className={style.main}>{children}</div>
  </div>;
};
export default MainLayout;
