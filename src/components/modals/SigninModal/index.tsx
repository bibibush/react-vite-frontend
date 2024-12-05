import SigninMarks from "@/components/SigninMarks";
import SkyBalloon from "@/assets/skyballoon.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CustomForm from "@/components/forms/CustomForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useFoxStore } from "@/zustand/store";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthenticateFormParams {
  userEmail: string;
  password: string;
}

function SigninModal({ isOpen, onClose }: SigninModalProps) {
  const methods = useForm<AuthenticateFormParams>({
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });
  const { setAccessToken, setUser } = useFoxStore((state) => state);

  const handleSignin = async (data: AuthenticateFormParams) => {
    try {
      const res = await axios.post("/api/users/token/", {
        email: data.userEmail,
        password: data.password,
      });

      setAccessToken(res.data.access);
      setUser(res.data.user);
      methods.reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-blue-100 border-0 lg:min-w-[830px] lg:min-h-[635px] 3xl:min-w-[1024px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle hidden />
        <SigninMarks />
        <img
          className="absolute 3xl:top-[80px] 3xl:left-10 3xl:w-[269px]"
          src={SkyBalloon}
          alt="열기구"
        />
        <section className="absolute lg:w-[65%] h-full top-0 right-0 rounded-l-lg bg-white p-11">
          <p className="text-2xl font-semibold mt-14 text-center">
            Signin with your Email
          </p>
          <Form {...methods}>
            <form
              className="flex flex-col items-center gap-5 mt-10"
              onSubmit={methods.handleSubmit(handleSignin)}
            >
              <CustomForm<AuthenticateFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="userEmail"
                label="email"
                rules={{
                  required: {
                    value: true,
                    message: "이메일은 필수입력항목입니다.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:
                      "이메일 형식이 아닙니다. 이메일 형식으로 입력해주세요.",
                  },
                }}
                placeholder="이메일을 입력해주세요."
              />
              <CustomForm<AuthenticateFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="password"
                label="password"
                rules={{
                  required: {
                    value: true,
                    message: "비밀번호는 필수입력항목입니다.",
                  },
                }}
                placeholder="비밀번호를 입력해주세요."
                isPassword
              />
              <Button className="bg-[#F9ED32] 3xl:w-[340px] 3xl:h-[45px] text-black hover:bg-[#f9ec32a6] 3xl:text-xl font-normal">
                Sign in
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SigninModal;
