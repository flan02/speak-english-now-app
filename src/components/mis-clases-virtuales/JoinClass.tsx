import Link from 'next/link';
import { Button } from '../ui/button';

type Props = {
  link: string
  status: string
}

const JoinClass = ({ link, status }: Props) => {
  const isDisabled = status === 'completed'
  return (
    <>
      {
        isDisabled ? (
          <Button
            disabled
            size="sm"
            variant="outline"
            className="w-[90px] h-8 ml-4 text-xs bg-gray-500 text-white cursor-not-allowed"
          >
            Unirse
          </Button>
        ) : (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="w-[90px] h-8 ml-4 text-xs bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-gray-300"
            >
              Unirse
            </Button>
          </Link>
        )
      }
    </>
  );
};

export default JoinClass


