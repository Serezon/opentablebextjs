import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const config = {
  matcher: ["/api/auth/me"],
};

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new NextResponse(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
  } catch (e) {
    return new NextResponse(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
}
