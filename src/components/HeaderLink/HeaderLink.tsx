import { FC } from 'react'
import Link from 'next/link';

type Props = {
  link: string;
  text: string;
  dataTestID: string;
};

export const HeaderLink: FC<Props> = ({ 
  link, 
  text,
  dataTestID
}) => {
  return (
    <Link href={`${link}`}>
      <a 
        data-testid={`${dataTestID}`}
        className='text-gray-300 hover:bg-gray-700 px-3 py-2 rounded'
      >
        { text }
      </a>
    </Link>
  )
};