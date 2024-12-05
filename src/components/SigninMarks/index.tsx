import BottopMark from "./BottopMark";
import LeftTopMark from "./LeftTopMark";
import RightTopMark from "./RightTopMark";

function SigninMarks() {
  return (
    <div className="relative">
      <LeftTopMark />
      <RightTopMark />
      <BottopMark />
    </div>
  );
}

export default SigninMarks;
