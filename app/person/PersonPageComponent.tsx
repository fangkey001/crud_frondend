"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/th";
import toast from "react-hot-toast";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { matchGender } from "@/utils/matchGender";
import { fetchPersons, fetchDeletePerson, Person } from "@/libs/api/PersonAPI";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  SortDescriptor,
  User,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "@/public/assets/icons/SearchIcon";
import { DeleteIcon } from "@/public/assets/icons/DeleteIcon";
import { EditIcon } from "@/public/assets/icons/EditIcon";
import { PlusSquareIcon } from "@/public/assets/icons/PlusSquareIcon";

const columns = [
  {
    key: "name",
    label: "ชื่อ",
  },
  {
    key: "id_card",
    label: "ข้อมูลบัตรประชาชน",
  },
  {
    key: "birth_date",
    label: "วันเดือนปีเกิด",
  },
  {
    key: "address",
    label: "ที่อยู่",
  },
  {
    key: "created_at",
    label: "วันที่เพิ่ม",
  },
  {
    key: "updated_at",
    label: "แก้ไขล่าสุด",
  },
  {
    key: "actions",
    label: "จัดการ",
  },
];

export default function PersonPageComponent() {
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get_persons", page, currentSearch, sortDescriptor],
    queryFn: () =>
      fetchPersons(
        page,
        rowsPerPage,
        currentSearch,
        sortDescriptor.column as string,
        sortDescriptor.direction as string
      ),
  });

  const persons: Person[] = useMemo(() => data?.data || [], [data]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchValue(value);
      setPage(1);
    } else {
      setSearchValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setSearchValue("");
    setPage(1);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetchDeletePerson(id);

      if (response && response.status !== 200) {
        toast.error("เกิดข้อผิดพลาดไม่สามารถลบข้อมูลได้");
        return;
      }

      toast.success("ลบข้อมูลสำเร็จ");
      queryClient.invalidateQueries({ queryKey: ["get_persons"] });
    } catch (error) {
      console.error(error);
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-2">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="ชื่อที่ต้องการค้นหา"
            startContent={<SearchIcon />}
            value={searchValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Link
            href={"/person/add"}
            className="shrink-0 flex p-2 rounded-lg bg-green/20 gap-2"
          >
            <PlusSquareIcon color="rgb(69 189 98)" />
            <span className="text-green">เพิ่มข้อมูล</span>
          </Link>
        </div>
      </div>
    );
  }, [searchValue, onSearchChange, onClear]);

  if (isLoading) return <span>Loading</span>;

  return (
    <div className="flex flex-col gap-4">
      <Table
        aria-label="Script table"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={data?.totalPages || 1}
              onChange={(page) => setPage(page)}
              className="z-0"
            />
          </div>
        }
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: "min-h-[222px] w-full shadow-lg",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              {...(column.key !== "actions" && { allowsSorting: true })}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={persons} emptyContent={"ไม่พบข้อมูล"}>
          {(person) => (
            <TableRow key={person.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(queryClient, person, columnKey, handleDelete)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const renderCell = (
  queryClient: QueryClient,
  person: Person,
  columnKey: React.Key,
  handleDelete: (id: number) => void
) => {
  const cellValue = person[columnKey as keyof Person];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: "" }}
          description={`อายุ ${person.age} ปี เพศ ${matchGender(
            person.gender
          )}`}
          name={`${person.first_name} ${person.middle_name} ${person.last_name}`}
        >
          {`${person.first_name} ${person.middle_name} ${person.last_name}`}
        </User>
      );
    case "id_card":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-500">
            วันหมดอายุ {moment(person.expire_id_card).format("D MMMM YYYY")}
          </p>
        </div>
      );
    case "birth_date":
      return <span>{moment(cellValue).format("D MMMM YYYY")}</span>;
    case "address":
      return (
        <span>
          {person.address} {person.district} {person.sub_district}{" "}
          {person.province} {person.zip_code}
        </span>
      );
    case "created_at":
      return <span>{moment(cellValue).format("D MMMM YYYY")}</span>;
    case "updated_at":
      return <span>{moment(cellValue).format("D MMMM YYYY")}</span>;
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Tooltip content="แก้ไขข้อมูล">
            <Link
              href={`/person/edit?id=${person.id}`}
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="ลบข้อมูล">
            <span
              className="cursor-pointer text-lg text-danger active:opacity-50"
              onClick={() => handleDelete(person.id)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return null;
  }
};
