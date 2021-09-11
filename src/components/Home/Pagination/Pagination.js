import React from "react";
import { usePagination, DOTS } from "../../../lib/customHooks";
import styles from "./Pagination.module.css";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={styles.back}>
      <ul className={styles.paginationContainer}>
        {currentPage !== 1 ? (
          <li className={styles.paginationItem} onClick={onPrevious}>
            <div className={`${styles.arrow} ${styles.left}`}>
              <AiOutlineCaretLeft />
            </div>
          </li>
        ) : (
          ""
        )}
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={pageNumber}
                className={(styles.paginationItem, styles.dots)}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={
                currentPage === pageNumber
                  ? `${styles.paginationItem} ${styles.current}`
                  : styles.paginationItem
              }
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {currentPage !== lastPage ? (
          <li className={styles.paginationItem} onClick={onNext}>
            <div className={(styles.arrow, styles.right)}>
              <AiOutlineCaretRight />
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Pagination;
