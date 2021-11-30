/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ChangeEvent, useEffect } from "react";
import { useAsync } from "hooks/useAsync";
import Tour from "components/Tour";
import StatusWrapper from "components/StatusWrapper";
import type { TourType } from "types";

enum SortCriteria {
  PRICE_LOW = "price-lowest-first",
  PRICE_HIGH = "price-highest-first",
  DURATION_SHORT = "duration-shortest-first",
  DURATION_LONG = "duration-longest-first",
}

function Tours({ ...props }) {
  const { data: tours, status, error, run } = useAsync();
  const [activeSortCriteria, setActiveSortCriteria] =
    React.useState<SortCriteria>(SortCriteria.PRICE_LOW);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await window.fetch(
        "https://jsonblob.com/api/jsonBlob/892812282795671552"
      );

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    };

    run(fetchTours());
  }, [run]);

  const getSortedTours = (tours: TourType[]): TourType[] | [] => {
    if (tours) {
      // use better fake images
      tours = tours.map((tour, index) => ({
        ...tour,
        img_url: `https://picsum.photos/${400 + index * 4}/${300 + index * 3}`,
        map_url: `https://picsum.photos/${200 + index * 2}/${100 + index}`,
      }));

      const sortMap = {
        [SortCriteria.PRICE_LOW]: (a: TourType, b: TourType) => {
          return a.price - b.price;
        },
        [SortCriteria.PRICE_HIGH]: (a: TourType, b: TourType) => {
          return b.price - a.price;
        },
        [SortCriteria.DURATION_SHORT]: (a: TourType, b: TourType) => {
          return a.length - b.length;
        },
        [SortCriteria.DURATION_LONG]: (a: TourType, b: TourType) => {
          return b.length - a.length;
        },
      };

      const sortedTours = tours.sort(sortMap[activeSortCriteria]);

      return sortedTours;
    }
    return [];
  };

  const handleSortCriteriaChange = (event: ChangeEvent) => {
    setActiveSortCriteria(
      (event.target as HTMLOptionElement)?.value as SortCriteria
    );
  };

  return (
    <StatusWrapper status={status} error={error}>
      <div {...props}>
        <div
          css={css`
            display: flex;
            justify-content: right;
            margin-bottom: 16px;
          `}
        >
          <select
            onChange={handleSortCriteriaChange}
            name="sort-criteria"
            id="sort-criteria"
            css={css`
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.25.5L.5 5.5H3v8.75h2.5V5.5H8L4.25.5zM13 1.75h-2.5v8.75H8l3.75 5 3.75-5H13V1.75z' fill='%23818d99' stroke='%23818d99' stroke-width='.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"),
                url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.89 1.005a.782.782 0 00-.312-.247c-.13-.06-.28-.091-.43-.091H.851c-.15 0-.299.031-.43.09a.782.782 0 00-.312.248.553.553 0 00-.11.336.56.56 0 00.123.334L4.27 7.013a.796.796 0 00.311.235c.128.056.272.085.419.085.147 0 .29-.03.419-.085a.796.796 0 00.31-.235l4.148-5.338A.56.56 0 0010 1.34a.553.553 0 00-.11-.336z' fill='%23818d99'/%3E%3C/svg%3E");
              background-position: left 14px center, right 14px center;
              background-size: 12px, 10px;
              padding: 16px 32px;
              border-radius: 5px;
              color: #2c3e50;
              font-family: Helvetica, Arial, FreeSans, sans-serif;
              font-size: 14px;
              line-height: 16px;
              border: 1px solid #c7d0d9;
              border-radius: 3px;
              outline: 0;
              appearance: none;
              background-color: #fff;
              background-repeat: no-repeat;
            `}
          >
            <option value={SortCriteria.PRICE_LOW}>
              Total price: Lowest first
            </option>
            <option value={SortCriteria.PRICE_HIGH}>
              Total price: Highest first
            </option>
            <option value={SortCriteria.DURATION_SHORT}>
              Duration: Shortest first
            </option>
            <option value={SortCriteria.DURATION_LONG}>
              Duration: Longest first
            </option>
          </select>
        </div>
        <div>
          {getSortedTours(tours).map((tour: TourType) => (
            <Tour
              css={css`
                box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.25);
                &:not(:last-of-type) {
                  margin-bottom: 24px;
                }
              `}
              // This needs to be done since tour.id wasn't unique (or maybe the api returns duplicated items)
              key={`${tour.id}-${tour.price}`}
              tour={tour}
            />
          ))}
        </div>
      </div>
    </StatusWrapper>
  );
}

export default Tours;
