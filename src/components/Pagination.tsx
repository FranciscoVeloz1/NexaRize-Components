import React from 'react'
import { ChangeEvent, useEffect, useState } from "react";
import { PaginationStyles } from "../interfaces/IPagination";

interface Props {
  total: number;
  label: string;
  txtPage: string;
  setTxtPage: (page: string) => void;
  styles?: PaginationStyles;
}

const Pagination = ({ total, label, txtPage, setTxtPage, styles }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const regex = /^\d+$/;
      const input = e.target.value;

      if (input === "") return setTxtPage("");
      if (input === "0") return setTxtPage("1");
      if (!regex.test(input)) return setTxtPage("1");
      if (Number(input) > total) return setTxtPage(total.toString());
      setTxtPage(input);
      setCurrentPage(parseInt(input));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setTxtPage(currentPage.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className={styles?.container}>
      <button
        className={currentPage === 1 ? styles?.btn_disabled : styles?.btn}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <div className={styles?.content}>
        <input
          className={styles?.input}
          type="text"
          onChange={handleChange}
          value={txtPage}
        />
        <p className={styles?.label}>{label} {total}</p>
      </div>

      <button
        className={
          currentPage === total ? styles?.btn_disabled : styles?.btn
        }
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === total}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
