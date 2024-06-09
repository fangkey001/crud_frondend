"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchLocales } from "@/libs/api/ProvinceAPI";
import { CreatePersonData, fetchCreatePerson } from "@/libs/api/PersonAPI";
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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import moment from "moment";
import {
  Districts,
  fetchDistricts,
  fetchProvinces,
  fetchSubDistricts,
  fetchZipCode,
  Provinces,
  SubDistricts,
  ZipCode,
} from "@/libs/api/LocalesAPI";

export default function AddPersonCompoantns() {
  const router = useRouter();

  const formik = useFormik<CreatePersonData>({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      birth_date: "",
      age: 0,
      address: "",
      sub_district_id: "",
      district_id: "",
      province_id: "",
      zip_code: "",
      id_card: "",
      expire_id_card: "",
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

  const [locales, setLocales] = useState({
    provinces: [] as Provinces[],
    districts: [] as Districts[],
    subDistricts: [] as SubDistricts[],
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
        const { province_id } = formik.values;

        if (province_id) {
          const id = formik.values.province_id;
          const response = await fetchDistricts(id);

          if (response && response.status === 200) {
            setLocales((prevLocales) => ({
              ...prevLocales,
              districts: response.data,
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getDistricts();
  }, [formik.values]);

  useEffect(() => {
    const getSubDistrict = async () => {
      try {
        const { district_id } = formik.values;

        if (district_id) {
          const id = formik.values.district_id;
          const response = await fetchSubDistricts(id);

          if (response && response.status === 200) {
            setLocales((prevLocales) => ({
              ...prevLocales,
              subDistricts: response.data,
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSubDistrict();
  }, [formik.values]);

  const handleSubmitForm = async (values: CreatePersonData) => {
    try {
      const response = await fetchCreatePerson(values);

      if (response?.status !== 200) {
        toast.error(response?.message || "ไม่สามารถเพิ่มข้อมูลไม่ได้");
        return;
      }

      toast.success("เพิ่มข้อมูลสำเร็จ");
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
      label: "เพิ่มข้อมูลส่วนบุคคล",
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
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <Input
                isClearable
                name="middle_name"
                type="text"
                label="ชื่อกลาง"
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
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <DatePicker
                isRequired
                name="expire_id_card"
                label="วันหมดอายุบัตร"
                showMonthAndYearPickers
                isInvalid={
                  !!formik.touched.expire_id_card &&
                  !!formik.errors.expire_id_card
                }
                errorMessage="กรุณาเลือกวันหมดอายุบัตร"
                onChange={(value) =>
                  formik.setFieldValue(
                    "expire_id_card",
                    moment(value).format("YYYY-MM-DD")
                  )
                }
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <DatePicker
                isRequired
                name="birth_date"
                label="วันเกิด"
                showMonthAndYearPickers
                isInvalid={
                  !!formik.touched.birth_date && !!formik.errors.birth_date
                }
                errorMessage="กรุณาเลือกวันเกิด"
                onChange={(value) =>
                  formik.setFieldValue(
                    "birth_date",
                    moment(value).format("YYYY-MM-DD")
                  )
                }
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
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-cols-4 col-span-3 gap-4">
              <div className="col-span-4 sm:col-span-1">
                <Select
                  name="province_id"
                  label="จังหวัด"
                  placeholder="เลือกจังหวัด"
                  isInvalid={
                    !!formik.touched.province_id && !!formik.errors.province_id
                  }
                  errorMessage="กรุณาเลือกจังหวัด"
                  items={locales.provinces}
                  value={formik.values.district_id}
                  onChange={formik.handleChange}
                >
                  {(item) => (
                    <SelectItem key={item.id}>{item.name_th}</SelectItem>
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
