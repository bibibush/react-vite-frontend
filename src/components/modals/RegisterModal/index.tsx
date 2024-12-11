import SigninMarks from "@/components/SigninMarks";
import SkyBalloon from "@/assets/skyballoon.png";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CustomInputForm from "@/components/forms/CustomInputForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisterFormParams {
  email: string;
  username: string;
  password1: string;
  password2: string;
}

function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const methods = useForm<RegisterFormParams>({
    defaultValues: {
      email: "",
      username: "",
      password1: "",
      password2: "",
    },
  });

  const handleRegister = async (data: RegisterFormParams) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    try {
      await axios.post("/api/users/create/", formData);
      onClose();
      methods.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-blue-100 border-0 lg:min-w-[830px] lg:min-h-[695px] 3xl:min-w-[1024px] 3xl:min-h-[735px]"
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
          <p className="text-2xl font-semibold text-center mt-14">
            Sign up with your Email
          </p>
          <Form {...methods}>
            <form
              className="flex flex-col items-center gap-5 mt-10"
              onSubmit={methods.handleSubmit(handleRegister)}
            >
              <CustomInputForm<RegisterFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="email"
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
              <CustomInputForm<RegisterFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="username"
                label="user name"
                rules={{
                  required: {
                    value: true,
                    message: "유저이름은 필수입력항목입니다.",
                  },
                }}
                placeholder="유저이름을 입력해주세요."
              />
              <CustomInputForm<RegisterFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="password1"
                label="password"
                rules={{
                  required: {
                    value: true,
                    message: "비밀번호는 필수입력항목입니다.",
                  },
                  pattern: {
                    value:
                      /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[\W_]))[a-zA-Z0-9\W_]{8,}$/,
                    message:
                      "비밀번호는 하나 이상의 영문자, 숫자,특수기호가 들어간 8자리 이상이여야 합니다.",
                  },
                }}
                placeholder="비밀번호를 입력해주세요."
                isPassword
              />
              <CustomInputForm<RegisterFormParams>
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="password2"
                label="check password"
                rules={{
                  required: {
                    value: true,
                    message: "비밀번호는 필수입력항목입니다.",
                  },
                  validate: {
                    isSame: (value) =>
                      value === methods.getValues("password1") ||
                      "비밀번호가 맞지 않습니다.",
                  },
                }}
                placeholder="같은 비밀번호를 입력해주세요."
                isPassword
              />
              <Button className="bg-[#F9ED32] 3xl:w-[340px] 3xl:h-[45px] text-black hover:bg-[#f9ec32a6] 3xl:text-xl font-normal">
                Sign up
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
