import { NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function GET() {
  const { data, error } = await userService.getSession();
  return NextResponse.json({ data, error });
}
