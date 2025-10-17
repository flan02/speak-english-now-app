import Link from 'next/link';
import { Button } from '../ui/button';

type Props = { link: string };

const JoinClass = ({ link }: Props) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <Button size="sm" variant="outline" className="w-[80px] h-8 ml-4 text-xs bg-black text-white dark:bg-white dark:text-black">
        Unirse
      </Button>
    </Link>
  );
};

export default JoinClass


// 'use client'
// import Link from 'next/link'
// import { Button } from '../ui/button'

// type Props = {
//   link: string
// }

// const JoinClass = ({ link }: Props) => {
//   return (
//     <Link
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Button
        
//         size='sm'
//         variant='outline'
//         className='w-[80px] h-8 ml-4 text-xs bg-black text-white dark:bg-white dark:text-black'
//       >
//         <span>Unirse</span>
//       </Button>
//     </Link>
//   )
// }

// export default JoinClass