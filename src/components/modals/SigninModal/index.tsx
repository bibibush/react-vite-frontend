import SigninMarks from "@/components/SigninMarks";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SigninModal({ isOpen, onClose }: SigninModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-blue-200 border-0 lg:min-w-[1024px] lg:min-h-[734px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <SigninMarks />
        <div className="absolute lg:w-[65%] h-full top-0 right-0 rounded-l-lg bg-white">
          하이
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SigninModal;
