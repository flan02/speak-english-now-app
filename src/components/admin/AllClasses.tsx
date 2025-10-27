import { getAllClasses } from '@/app/(dashboard)/admin/actions'
import { Session } from 'next-auth'
import EachClass from './EachClass'
import { VirtualClass } from '@/lib/types'



type SessionProps = {
  session: Session
  filter: string
}

const AllClasses = async ({ session, filter }: SessionProps) => {

  // ? const classes = await getAllClasses(filter) (create a new call to the db with filter (searchParams) value changes)
  const all_classes: VirtualClass[] = await getAllClasses() as VirtualClass[]

  return (
    <div className='space-y-1'>
      {
        session && filter != undefined ?
          all_classes?.
            filter((classItem: VirtualClass) => classItem.status === filter)
            .map((classItem: VirtualClass, index) => (
              <EachClass key={index} classItem={classItem} index={index} />
            ))
          :
          all_classes?.map((classItem: VirtualClass, index) => (
            <EachClass key={index} classItem={classItem} index={index} />
          ))
      }
    </div>
  )
}

export default AllClasses