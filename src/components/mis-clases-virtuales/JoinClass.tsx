import Link from 'next/link';
import { Button } from '../ui/button';
import { validateMeetingDate } from '@/lib/utils';

type Props = {
  link: string
  status: string
  date: string
  time: {
    start: string
    end: string
  }
}

const JoinClass = ({ link, status, date, time }: Props) => {

  const isValidMeeting = validateMeetingDate(date, time.start, time.end)
  if (!isValidMeeting) return null;
  return (
    <div className='-ml-1 lg:ml-0 xl:ml-0 2xl:ml-0'>

      <Link href={link} target="_blank" rel="noopener noreferrer">
        <Button
          size="sm"
          variant="outline"
          className="bg-highlight w-[90px] h-8 xl:ml-4 2xl:ml-4 text-xs hover:bg-black/80 dark:hover:bg-gray-300"
        >
          Unirse
        </Button>
      </Link>

    </div>
  );
};

export default JoinClass

/*
const JoinClass = ({ link, status, date, time }: Props) => {

  const isValidMeeting = validateMeetingDate(date, time.start, time.end)
  if (!isValidMeeting) return null;
  return (
    <div className='-ml-1 lg:ml-0 xl:ml-0 2xl:ml-0'>
      {
        isValidMeeting ? (
          <Button
            disabled={isValidMeeting}
            size="sm"
            variant="outline"
            className="bg-highlight w-[90px] h-8 lg:ml-4 xl:ml-4 2xl:ml-4 text-xs"
          >
            Unirse
          </Button>
        ) : (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="bg-highlight w-[90px] h-8 xl:ml-4 2xl:ml-4 text-xs hover:bg-black/80 dark:hover:bg-gray-300"
            >
              Unirse
            </Button>
          </Link>
        )}
    </div>
  );
};

export default JoinClass
*/


