// bug reload page after login fail
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Eye, EyeClosed, LoaderCircle } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/schemas/auth-schemas";
import type { LoginRequest } from "@/types/auth.type";
import { useLogin } from "@/hooks/useAuth";
import { Link } from "react-router";

export default function SignInForm() {
  const loginMutation = useLogin();

  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitSignIn = async (data: LoginRequest) => {
    try {
      await loginMutation.mutate(data);
      console.log("Submitting login form with data:", data);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignIn)}
      className="flex flex-col gap-4"
    >
      <FieldSet>
        <FieldDescription>
          <span className="text-primary-dark">*</span> indicates required field
          {errors.root && (
            <div className="text-red-500 text-sm font-medium border-red-500 border rounded-md p-2 mt-2">
              {errors.root.message}
            </div>
          )}
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="emailOrUsername">
              Email or Username{" "}
            </FieldLabel>

            <Input
              id="emailOrUsername"
              autoComplete="off"
              disabled={loginMutation.isPending}
              placeholder="Username or email address"
              {...register("emailOrUsername")}
              className={` ${errors.emailOrUsername ? " border-red-500" : ""} `}
            />
            {errors.emailOrUsername && (
              <FieldError> {errors.emailOrUsername.message} </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <InputGroup
              className={` ${errors.password ? " border-red-500" : ""} `}
            >
              <InputGroupInput
                id="password"
                placeholder="Password"
                disabled={loginMutation.isPending}
                type={isVisible ? "text" : "password"}
                {...register("password")}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  onClick={() => {
                    setIsVisible((prev) => !prev);
                  }}
                >
                  {isVisible ? <Eye /> : <EyeClosed />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <FieldError> {errors.password.message} </FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex items-center gap-2 mt-4 mb-6 text-sm text-neutral-800">
        <Checkbox id="remember-me" className="mr-1" />
        <label
          htmlFor="remember-me"
          className="flex flex-wrap items-center gap-1"
        >
          <span>Keep me signed in.</span>
        </label>
      </div>

      <div className="flex flex-col items-start space-y-1 mb-6 text-sm">
        <Link
          className="text-green-800 font-semibold underline hover:no-underline"
          to={"/account/forgot-password"}
        >
          Forgot your password?
        </Link>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="rounded-full px-8 py-4 font-semibold bg-green-800 hover:bg-green-900 text-white shadow-md"
        >
          {loginMutation.isPending ? (
            <span>
              <LoaderCircle
                size={32}
                strokeWidth={5}
                className="animate-spin"
              />
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
}
