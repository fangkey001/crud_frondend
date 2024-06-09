import React from "react";
import type { Metadata } from "next";
import { Person, fetchPersonId } from "@/libs/api/PersonAPI";
import EditPersonCompoantns from "./EditPersonCompoantns";

export const metadata: Metadata = {
  title: "ระบบจัดการ FiveM - เพิ่มสคลิปต์ใหม่",
  description: "ระบบจัดการ FiveM - เพิ่มสคลิปต์ใหม่",
};

export default async function EditPersonPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;
  const person = await fetchPersonId(id);

  if (!person || !person.data) return null;

  return <EditPersonCompoantns person={person.data}/>;
}
