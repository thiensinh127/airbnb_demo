"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import toast from "react-hot-toast";
import { Modal } from ".";
import { Button } from "../button";
import Heading from "../Heading";
import Input from "../input";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.error) {
        toast.error(callback?.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = () => {
    return (
      <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="login to your account!" />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          required
          errors={errors}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          required
          errors={errors}
        />
      </div>
    );
  };

  const footerContent = () => {
    return (
      <div className="flex flex-col gap-4 mt-3">
        <Button
          className="w-full mt-6 text-white bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
        <hr />
        <Button
          className="w-full"
          onClick={() => signIn("google")}
          startIcon={<FcGoogle />}
          variant="outlined"
        >
          Continue with Google
        </Button>

        <Button
          className="w-full"
          startIcon={<AiFillGithub />}
          variant="outlined"
          onClick={() => signIn("github")}
        >
          Continue with Github
        </Button>

        <div className="flex flex-row items-center gap-2 ">
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      disabled={isLoading}
      open={loginModal.isOpen}
      title="Login"
      okText="Continue"
      onClose={loginModal.onClose}
      hasFooter={false}
      maskClosable={false}
    >
      {bodyContent()}
      {footerContent()}
    </Modal>
  );
};

export default LoginModal;
