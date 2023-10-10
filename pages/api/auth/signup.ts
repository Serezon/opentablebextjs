import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, city, password, phone } = req.body;

    const errors: Array<string> = [];
    const validationSchema = [
      {
        valid: () => validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name is invalid",
      },
      {
        valid: () => validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: () => validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: () => validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid",
      },
      {
        valid: () => validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: () => validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
      },
    ];

    validationSchema.forEach((validation) => {
      try {
        if (!validation.valid()) {
          errors.push(validation.errorMessage);
        }
      } catch (e) {
        errors.push(validation.errorMessage);
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

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        city,
        password: hashedPassword,
        phone,
      },
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const algorithm = "HS256";

    const token = await new jose.SignJWT({ email, id: newUser.id })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 60 * 24 });

    return res.status(200).json({
      id: newUser.id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
      city: newUser.city,
      phone: newUser.phone,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
