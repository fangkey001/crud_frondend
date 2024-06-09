"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchUpdatePerson, CreatePersonData, Person } from "@/libs/api/PersonAPI";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { PlusSquareIcon } from "@/public/assets/icons/PlusSquareIcon";
import toast from "react-hot-toast";
import Breadcrumb, { BreadcrumbsType } from "@/components/Breadcrumb";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import {
  Districts,
  fetchDistricts,
  fetchProvinces,
  fetchSubDistricts,
  Provinces,
  SubDistricts,
} from "@/libs/api/LocalesAPI";

export default function EditPersonCompoantns({ person }: { person: Person }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [locales, setLocales] = useState({
    provinces: [] as Provinces[],
    districts: [] as Districts[],
    subDistricts: [] as SubDistricts[],
  });

  const formik = useFormik<CreatePersonData>({
    initialValues: {
      first_name: person.first_name,
      middle_name: person.middle_name,
      last_name: person.last_name,
      gender: person.gender,
      birth_date: person.birth_date,
      age: person.age,
      address: person.address,
      sub_district_id: person.sub_district_id,
      district_id: person.district_id,
      province_id: person.province_id,
      zip_code: person.zip_code,
      id_card: person.id_card,
      expire_id_card: person.expire_id_card,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("กรุณากรอกชื่อจริง"),
      middle_name: Yup.string().nullable(),
      last_name: Yup.string().required("กรุณากรอกนามสกุล"),
      gender: Yup.string().required("กรุณาเลือกเพศ"),
      birth_date: Yup.string().required("กรุณากรอกวันเกิด"),
      age: Yup.number().required("กรุณากรอกอายุ"),
      address: Yup.string().required("กรุณากรอกที่อยู่"),
      sub_district_id: Yup.string().required("กรุณาเลือกตำบล"),
      district_id: Yup.string().required("กรุณาเลือกจังหวัด"),
      province_id: Yup.string().required("กรุณาเลือกจังหวัด"),
      zip_code: Yup.string().required("กรุณากรอกรหัสไปรษณีย์ไทย"),
      id_card: Yup.string().required("กรุณากรอกเลขบัตรประชาชน"),
      expire_id_card: Yup.string().required("กรุณากรอกวันหมดอายุบัตรประชาชน"),
    }),
    onSubmit: (values) => handleSubmitForm(values),
  });

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await fetchProvinces();

        if (response && response.status === 200) {
          setLocales((prevLocales) => ({
            ...prevLocales,
            provinces: response.data,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProvinces();
  }, []);

  useEffect(() => {
    const getDistricts = async () => {
      try {
        const id = formik.values.province_id;
        const response = await fetchDistricts(id);

        if (response && response.status === 200) {
          setLocales((prevLocales) => ({
            ...prevLocales,
            districts: response.data,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDistricts();
  }, [formik.values.province_id]);

  useEffect(() => {
    const getSubDistrict = async () => {
      try {
        const id = formik.values.district_id;
        const response = await fetchSubDistricts(id);

        if (response && response.status === 200) {
          setLocales((prevLocales) => ({
            ...prevLocales,
            subDistricts: response.data,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSubDistrict();
  }, [formik.values.district_id]);

  const handleSubmitForm = async (values: CreatePersonData) => {
    try {
      if (!id) return;

      const response = await fetchUpdatePerson(id, values);

      if (response?.status !== 200) {
        toast.error(response?.message || "ไม่สามารถแก้ไขข้อมูลไม่ได้");
        return;
      }

      toast.success("แก้ไขข้อมูลสำเร็จ");
      router.push("/person");
    } catch (error) {
      console.error(error);
    }
  };

  const breadcrumb: BreadcrumbsType[] = [
    {
      label: "หน้าแรก",
      route: "/person",
    },
    {
      label: "แก้ไขข้อมูลส่วนบุคคง",
    },
    {
      label: `${person.first_name} ${person.middle_name} ${person.last_name}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb breadcrumb={breadcrumb} />
      <Card
        isFooterBlurred
        radius="lg"
        className="col-span-1 p-4 border-none shadow-lg"
      >
        <CardHeader className="flex gap-4">
          <div className="p-2 rounded-full bg-green/20">
            <PlusSquareIcon color="rgb(69 189 98)" />
          </div>
          <h1 className="text-xl text-primary">เพิ่มข้อมูลส่วนบุคคล</h1>
        </CardHeader>
        <CardBody>
          <form
            className="grid grid-cols-3 gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-span-3 sm:col-span-1">
              <Input
                isRequired
                isClearable
                name="first_name"
                type="text"
                label="ชื่อจริง"
                isInvalid={
                  !!formik.touched.first_name && !!formik.errors.first_name
                }
                errorMessage="กรุณากรอกชื่อจริง"
                value={formik.values.first_name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <Input
                isClearable
                name="middle_name"
                type="text"
                label="ชื่อกลาง"
                value={formik.values.middle_name}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <Input
                isClearable
                isRequired
                name="last_name"
                type="text"
                label="นามสกุล"
                isInvalid={
                  !!formik.touched.last_name && !!formik.errors.last_name
                }
                errorMessage="กรุณากรอกนามสกุล"
                value={formik.values.last_name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-2">
              <Input
                isRequired
                isClearable
                name="id_card"
                type="text"
                label="เลขบัตรประชาชน"
                isInvalid={!!formik.touched.id_card && !!formik.errors.id_card}
                errorMessage="กรุณากรอกเลขบัตรประชาชน"
                value={formik.values.id_card}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <DatePicker
                isRequired
                showMonthAndYearPickers
                name="expire_id_card"
                label="วันหมดอายุบัตร"
                granularity="day"
                isInvalid={
                  !!formik.touched.expire_id_card &&
                  !!formik.errors.expire_id_card
                }
                errorMessage="กรุณาเลือกวันหมดอายุบัตร"
                value={parseAbsoluteToLocal(formik.values.expire_id_card)}
                onChange={(value) => {
                  const date = moment(
                    `${value.year}-${value.month}-${value.day}`,
                    "YYYY-MM-DD"
                  );

                  formik.setFieldValue("expire_id_card", date.toISOString());
                }}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <DatePicker
                isRequired
                showMonthAndYearPickers
                name="birth_date"
                label="วันเกิด"
                granularity="day"
                isInvalid={
                  !!formik.touched.birth_date && !!formik.errors.birth_date
                }
                errorMessage="กรุณาเลือกวันเกิด"
                value={parseAbsoluteToLocal(formik.values.birth_date)}
                onChange={(value) => {
                  const date = moment(
                    `${value.year}-${value.month}-${value.day}`,
                    "YYYY-MM-DD"
                  );

                  formik.setFieldValue("birth_date", date.toISOString());
                }}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <Input
                isRequired
                isClearable
                name="age"
                type="number"
                label="อายุ"
                isInvalid={!!formik.touched.age && !!formik.errors.age}
                errorMessage="กรุณากรอกอายุ"
                value={formik.values.age.toString()}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <RadioGroup
                isRequired
                name="gender"
                label="เพศ"
                orientation="horizontal"
                isInvalid={!!formik.touched.gender && !!formik.errors.gender}
                errorMessage="กรุณาเลือกเพศ"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <Radio value="M">ชาย</Radio>
                <Radio value="F">หญิง</Radio>
                <Radio value="Other">ไม่ระบุ</Radio>
              </RadioGroup>
            </div>
            <div className="col-span-3">
              <Input
                isRequired
                isClearable
                name="address"
                type="text"
                label="ที่อยู่"
                isInvalid={!!formik.touched.address && !!formik.errors.address}
                errorMessage="กรุณากรอกที่อยู่"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-cols-4 col-span-3 gap-4">
              <div className="col-span-4 sm:col-span-1">
                <Select
                  name="province_id"
                  label={"จังหวัด"}
                  placeholder="เลือกจังหวัด"
                  isInvalid={
                    !!formik.touched.province_id && !!formik.errors.province_id
                  }
                  errorMessage="กรุณาเลือกจังหวัด"
                  items={locales.provinces}
                  value={formik.values.province_id}
                  defaultSelectedKeys={[formik.values.province_id.toString()]}
                  onChange={formik.handleChange}
                >
                  {(item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name_th}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Select
                  name="district_id"
                  label="อำเภอ"
                  placeholder="เลือกอำเภอ"
                  isInvalid={
                    !!formik.touched.district_id && !!formik.errors.district_id
                  }
                  errorMessage="กรุณาเลือกอำเภอ"
                  selectionMode="single"
                  items={locales.districts}
                  value={formik.values.district_id}
                  defaultSelectedKeys={[formik.values.district_id.toString()]}
                  onChange={formik.handleChange}
                >
                  {(item) => (
                    <SelectItem key={item.id}>{item.name_th}</SelectItem>
                  )}
                </Select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Select
                  name="sub_district_id"
                  label="ตำบล"
                  placeholder="เลือกตำบล"
                  isInvalid={
                    !!formik.touched.sub_district_id &&
                    !!formik.errors.sub_district_id
                  }
                  errorMessage="กรุณาเลือกตำบล"
                  selectionMode="single"
                  items={locales.subDistricts}
                  value={formik.values.sub_district_id}
                  defaultSelectedKeys={[
                    formik.values.sub_district_id.toString(),
                  ]}
                  onChange={formik.handleChange}
                >
                  {(item) => (
                    <SelectItem key={item.id}>{item.name_th}</SelectItem>
                  )}
                </Select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input
                  isRequired
                  isClearable
                  name="zip_code"
                  type="text"
                  label="รหัสไปรษณีย์ไทย"
                  isInvalid={
                    !!formik.touched.zip_code && !!formik.errors.zip_code
                  }
                  errorMessage="กรุณากรอกรหัสไปรษณีย์ไทย"
                  value={formik.values.zip_code}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-span-3">
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                color="success"
                className="w-full text-white"
              >
                เพิ่มข้อมูล
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
