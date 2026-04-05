import z from "zod";

export const registerSchema = z.object({
  username: z.string().nonempty("Username không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export const loginSchema = z.object({
  emailOrUsername: z.string().nonempty("Username/Email không được để trống"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});
