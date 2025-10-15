import { Session } from "next-auth"



type SessionProps = {
  session: Session
}

const AllClasses: React.FC<SessionProps> = ({ session }) => {
  return (
    <div>MisClasesVirtuales</div>
  )
}

export default AllClasses