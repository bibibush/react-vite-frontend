import Invested from "./Invested";

export default interface User {
  id: number | null;
  isSuperuser: boolean;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isStaff: boolean;
  dateJoined: string | null;
  invests: Invested[] | null;
}
