import { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { cloudflareImg } from "@libs/client/utils";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const [avatarPreview, setAvatarPreview] = useState("");
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>({ mode: "onChange" });
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar) setAvatarPreview(cloudflareImg(user?.avatar, "avatar"));
  }, [user, setValue]);
  const [editPrifile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      setError("email", {
        message: "이메일 또는 휴대폰번호 중 한 가지는 필수입력사항 입니다.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      // cloudflare 빈 url 받아오는 api
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      // cloudflare 양식에 맞게 form javascript로 생성
      const form = new FormData();
      form.append("file", avatar[0], String(user.id));
      // cloudflare에 form 업로드 및 id값 수신
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editPrifile({ email, phone, name, avatarId: id });
    } else {
      editPrifile({ email, phone, name });
    }
  };
  useEffect(() => {
    if (data && !data.ok) {
      setError("email", { message: data.error });
    }
  }, [data, setError]);
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="py-10 px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="이름"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.email ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.email.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
