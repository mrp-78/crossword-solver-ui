import React from 'react';
import style from './MainLayout.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  const router = useRouter();
  const headerLinks = [
    {
      title: 'صفحه اصلی',
      href: '/'
    },
    {
      title: 'مشاهده دمو',
      href: '/demo'
    },
    {
      title: 'حل جدول',
      href: '/solve'
    },
    {
      title: 'درباره ما',
      href: '/about'
    }
  ]
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
