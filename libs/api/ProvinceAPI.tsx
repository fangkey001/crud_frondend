export type Locales = {
  id: number;
  province_name: string;
  district_name: string;
  subdistrict_name: string;
  zip_code: number;
};

export const fetchLocales = async ({
  province,
  district,
  sub_district,
}: {
  province: string;
  district: string;
  sub_district: string;
}) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/locales?province=${province}&&district=${district}&&sub_district=${sub_district}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
