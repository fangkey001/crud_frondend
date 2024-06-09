"use server";

export type ResponseAPI<T> = {
  data: T;
  message: string;
  status: number;
};

export type Provinces = {
  id: number;
  name_th: string;
};

export type Districts = {
  id: number;
  name_th: string;
};

export type SubDistricts = {
  id: number;
  name_th: string;
};

export type ZipCode = {
  zip_code: number;
};

export const fetchProvinces = async (): Promise<
  ResponseAPI<Provinces[]> | undefined
> => {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:3001/api/locales/provinces`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDistricts = async (
  id: string
): Promise<ResponseAPI<Districts[]> | undefined> => {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:3001/api/locales/districts?id=${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSubDistricts = async (
  id: string
): Promise<ResponseAPI<SubDistricts[]> | undefined> => {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:3001/api/locales/sub_districts?id=${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchZipCode = async (
  id: string
): Promise<ResponseAPI<ZipCode> | undefined> => {
  try {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:3001/api/locales/zipcode?id=${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
