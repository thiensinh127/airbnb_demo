"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Modal } from ".";
import { Button } from "../button";
import Heading from "../Heading";
import Input from "../input";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = () => {
    return (
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          required
          errors={errors}
        />
        <Input
          id="name"
          label="Name"
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
          onClick={() => signIn("github")}
          startIcon={<AiFillGithub />}
          variant="outlined"
        >
          Continue with Github
        </Button>

        <div className="flex flex-row items-center gap-2 ">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      disabled={isLoading}
      open={registerModal.isOpen}
      title="Register"
      okText="Continue"
      onClose={registerModal.onClose}
      hasFooter={false}
      maskClosable={false}
    >
      {bodyContent()}
      {footerContent()}
    </Modal>
  );
};

export default RegisterModal;
