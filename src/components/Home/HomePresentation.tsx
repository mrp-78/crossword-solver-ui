import React from 'react';
import MainLayout from "../../common/layouts/MainLayout/MainLayout";
import style from './Home.module.scss';
import Image from 'next/image';
import LinkButton from "common/components/LinkButton";

export type LoginPresentationProps = {
};

const HomePresentation: React.FC<LoginPresentationProps> = () => {
  return (
    <MainLayout>
      <div className={style.pageContainer}>
        <div className={style.headerContent}>
          <h1 className={style.title}>
            <b>جدول‌باز: </b>
            حل جدول آنلاین به کمک هوش مصنوعی
          </h1>
          <p className={style.content}>جدول‌باز یک نرم افزار حل‌کننده جدول کلمات متقاطع فارسی است که با استفاده از هوش مصنوعی و تکنیک‌های پردازش زبان طبیعی جدول را حل می‌کند.</p>
          <div className={style.linksContainer}>
            <LinkButton text='مشاهده دمو' href='/demo' theme='filled' />
            <LinkButton text='حل جدول' href='/solve' theme='outline' />
          </div>
        </div>
        <div className={style.headerImage}>
          <img src="/crossword-illustration.jpg" alt="crossword-illustration" width="100%" />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePresentation;
