import SigninMarks from "@/components/SigninMarks";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SkyBalloon from "@/assets/skyballoon.png";
import { Form } from "@/components/ui/form";
import CustomInputForm from "@/components/forms/CustomInputForm";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ChangeUser from "@/types/ChangeUser";
import { useFoxStore } from "@/zustand/store";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useChangeUser from "@/hooks/useChangeUser";
import { Badge } from "@/components/ui/badge";

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MyProfileModal({ isOpen, onClose }: MyProfileModalProps) {
  const {
    username,
    profileImg,
    id: userId,
  } = useFoxStore((state) => state.user);

  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [selectedImgURL, setSelectedImgURL] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<ChangeUser>({
    defaultValues: {
      username: "",
      password1: "",
      password2: "",
    },
  });

  const { mutate: changeUser } = useChangeUser();

  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedImg(file);

    e.target.value = "";
  };

  const handleResetImg = () => {
    setSelectedImg(new File([], ""));
    setSelectedImgURL(null);
  };

  const handleSubmitChangedUserInfo = useCallback(
    (data: ChangeUser) => {
      if (!userId) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extraData: any = {};
      if (selectedImg) {
        extraData["profile_img"] = selectedImg;
      }
      if (data.password1) {
        extraData["password1"] = data.password1;
      }
      if (data.password2) {
        extraData["password2"] = data.password2;
      }

      changeUser({
        username: data.username,
        userId,
        ...extraData,
      });
    },
    [userId, selectedImg, changeUser]
  );

  useEffect(() => {
    if (!username) {
      return;
    }

    methods.reset({
      username,
    });
    setSelectedImgURL(profileImg);
  }, [username, methods, profileImg]);

  useEffect(() => {
    if (!selectedImg) {
      return;
    }

    const convertedURL = URL.createObjectURL(selectedImg);
    setSelectedImgURL(convertedURL);

    return () => URL.revokeObjectURL(convertedURL);
  }, [selectedImg]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-blue-100 border-0 lg:min-w-[830px] lg:min-h-[630px] 3xl:min-w-[1024px] 3xl:min-h-[735px] overflow-auto"
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
        <section className="absolute lg:w-[65%] min-h-full top-0 right-0 rounded-l-lg bg-white p-11">
          <p className="text-2xl font-semibold text-center mt-14">
            Change your User Info
          </p>
          <Form {...methods}>
            <form
              className="relative flex flex-col items-center gap-5 mt-10"
              onSubmit={methods.handleSubmit(handleSubmitChangedUserInfo)}
            >
              <Avatar
                className="cursor-pointer size-36"
                onClick={() => profileInputRef.current?.click()}
              >
                <AvatarImage src={selectedImgURL ?? ""} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Badge
                className="absolute top-32 right-32"
                onClick={handleResetImg}
              >
                X
              </Badge>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={profileInputRef}
                hidden
                onChange={handleChangeProfileImg}
              />

              <CustomInputForm
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
              <CustomInputForm
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                rules={{
                  validate: {
                    isPassword2: (value) => {
                      if (!value && methods.getValues("password2")) {
                        return "비밀번호를 변경하고 싶으시면, 현재 비밀번호를 입력해주세요.";
                      }
                    },
                  },
                }}
                name="password1"
                label="current password"
                placeholder="비밀번호를 변경하고 싶으시면, 현재 비밀번호를 입력해주세요."
                isPassword
              />
              <CustomInputForm
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="password2"
                label="new password"
                rules={{
                  pattern: {
                    value:
                      /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[\W_]))[a-zA-Z0-9\W_]{8,}$/,
                    message:
                      "비밀번호는 하나 이상의 영문자, 숫자,특수기호가 들어간 8자리 이상이여야 합니다.",
                  },
                }}
                placeholder="비밀번호를 변경하고 싶으시면, 새로운 비밀번호를 입력해주세요."
                isPassword
              />
              <Button className="bg-[#F9ED32] 3xl:w-[340px] 3xl:h-[45px] text-black hover:bg-[#f9ec32a6] 3xl:text-xl font-normal">
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default MyProfileModal;
