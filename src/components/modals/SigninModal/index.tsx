import SigninMarks from "@/components/SigninMarks";
import SkyBalloon from "@/assets/skyballoon.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SigninModal({ isOpen, onClose }: SigninModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-blue-100 border-0 lg:min-w-[830px] lg:min-h-[635px] 3xl:min-w-[1024px] 3xl:min-h-[734px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <SigninMarks />
        <img
          className="absolute 3xl:top-[120px] 3xl:left-10 3xl:w-[269px]"
          src={SkyBalloon}
          alt="열기구"
        />
        <section className="absolute lg:w-[65%] h-full top-0 right-0 rounded-l-lg bg-white p-11">
          <p className="text-2xl font-semibold mt-14 text-center">
            Signin with your Email
          </p>
          <div className="flex flex-col items-center"></div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SigninModal;
