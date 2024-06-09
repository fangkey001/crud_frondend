export type ResponseAPI<T> = {
  data?: T;
  message: string;
  status: number;
};

export type Person = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  age: number;
  address: string;
  sub_district_id: string;
  district_id: string;
  province_id: string;
  zip_code: string;
  id_card: string;
  expire_id_card: string;
  created_at: string;
  updated_at: string;
  province: string;
  district: string;
  sub_district: string;
};

export type ResponData = {
  totalPages: number;
  data: Person[];
};

export type CreatePersonData = {
  id_card: string;
  expire_id_card: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  age: number;
  address: string;
  sub_district_id: string;
  district_id: string;
  province_id: string;
  zip_code: string;
};

export const fetchPersons = async (
  page: number,
  pageSize: number,
  search: string,
  sort: string,
  direction: string,
): Promise<ResponData | undefined> => {
  try {
    const sortDir = direction === "ascending" ? "asc" : "desc";

    const response = await fetch(
      `http://localhost:3001/api/persons?page=${page}&&pageSize=${pageSize}&&search=${search}&&sort=${sort}&&direction=${sortDir}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCreatePerson = async (
  data: CreatePersonData
): Promise<ResponseAPI<null> | undefined> => {
  try {
    const response = await fetch(`http://localhost:3001/api/persons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPersonId = async (
  id: string
): Promise<ResponseAPI<Person> | undefined> => {
  try {
    const response = await fetch(`http://localhost:3001/api/persons/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdatePerson = async (
  id: string,
  data: CreatePersonData
): Promise<ResponseAPI<null> | undefined> => {
  try {
    const response = await fetch(`http://localhost:3001/api/persons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDeletePerson = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/api/persons/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
