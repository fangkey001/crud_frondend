import React from "react";
import type { Metadata } from "next";
import AddPersonCompoantns from "./AddPersonCompoantns";

export const metadata: Metadata = {
  title: "ระบบจัดการ FiveM - เพิ่มสคลิปต์ใหม่",
  description: "ระบบจัดการ FiveM - เพิ่มสคลิปต์ใหม่",
};

export default function AddPersonPage() {
  return <AddPersonCompoantns />;
}
