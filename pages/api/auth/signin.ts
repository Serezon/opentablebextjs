import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import prisma from "../../../prisma/client";
import { setCookie } from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const errors: Array<string> = [];
    const validationSchema = [
      {
        valid: () => validator.isEmail(email),
      },
      {
        valid: () => validator.isLength(password, { min: 8 }),
      },
    ];

    validationSchema.forEach((validation) => {
      try {
        if (!validation.valid()) {
          errors.push("Email or password is invalid");
        }
      } catch (e) {
        errors.push("Email or password is invalid");
      }
    });

    if (errors.length) {
      return res.status(400).json({ message: errors[0] });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const algorithm = "HS256";

    const token = await new jose.SignJWT({ email, id: user.id })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 });

    return res.status(200).json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
