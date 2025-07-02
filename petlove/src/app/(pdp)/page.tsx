'use client';

import s from './styles.module.scss';

import { Link } from '@/components';

export default function Home() {
  return (
    <>
      <div className={s.container}>
        <h1>PDP Petlove</h1>
        <Link size="small" href="/loja/petlove/dados-do-pet">
          Ir para fluxo de aquisíção
        </Link>
      </div>
    </>
  );
}
