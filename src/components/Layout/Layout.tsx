import { ReactNode, VFC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderLink } from '../HeaderLink/HeaderLink';

type Props = {
  children: ReactNode;
  title: string;
};

export const Layout: VFC<Props> = ({ children, title }) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-green-600 text-sm font-mono'>
      <Head>
        <title>{ title }</title>
      </Head>
      <header>
        <nav className='bg-grey-800 w-screen'>
          <div className='flex items-center pl-8 h-14'>
            <div className='flex space-x-4'>
              <HeaderLink 
                link='/'
                text='Home'
                dataTestID='home-nav'
              />
              <HeaderLink 
                link='/local-state-a'
                text='makeVar'
                dataTestID='makevar-nav'
              />
              <HeaderLink 
                link='/hasura-main'
                text='fetchPolicy(Hasura)'
                dataTestID='hfetchpolicy-nav'
              />
              <HeaderLink 
                link='/hasura-crud'
                text='CRUD(Hasura)'
                dataTestID='crud-nav'
              />
              <HeaderLink 
                link='/hasura-ssg'
                text='SSG+ISR(Hasura)'
                dataTestID='ssg-nav'
              />
              <HeaderLink 
                link='/hooks-memo'
                text='custom hook + memo'
                dataTestID='memo-na'
              />
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}