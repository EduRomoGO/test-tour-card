/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { TourType } from "types";
import { ReactComponent as Check } from "icons/check.svg";
import Rating from "react-rating";
import { ReactComponent as StarFilled } from "icons/star-filled.svg";
import { ReactComponent as StarOutlined } from "icons/star-outline.svg";

const colorPrimitives = {
  gray: "#818d99",
  lightGray: "#ebeef2",
  green: "#41c4ab",
  blue: "#0a7bbd",
};

const colors = {
  sideInfo: colorPrimitives.gray,
  separator: colorPrimitives.lightGray,
  price: colorPrimitives.green,
  button: colorPrimitives.blue,
};
const breakpoints = [800];

const SideInfo = styled.p`
  color: ${colors.sideInfo};
`;

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

function InfoLine({
  category,
  value,
  maxValues,
}: {
  category: string;
  value: string[] | string;
  maxValues?: number;
}) {
  const getShownValue = () => {
    let shownValue = value;
    let additionalItems = 0;

    if (Array.isArray(value)) {
      if (maxValues !== undefined && value.length > maxValues) {
        shownValue = value.slice(0, maxValues).join(", ");
        additionalItems = value.length - maxValues;
      } else {
        shownValue = value.join(", ");
      }
    }

    return (
      <p>
        {shownValue}
        {additionalItems > 0 && (
          <span
            css={css`
              margin-left: 16px;
              color: #409cd1;
            `}
          >
            +{additionalItems} more
          </span>
        )}
      </p>
    );
  };

  return (
    <div
      css={css`
        display: flex;
        font-size: 0.9rem;
        &:not(:last-of-type) {
          margin-bottom: 6px;
        }
      `}
    >
      <p
        css={css`
          min-width: 40%;
          font-weight: bold;
          text-transform: capitalize;
        `}
      >
        {category}
      </p>
      <p>{getShownValue()}</p>
    </div>
  );
}

function Tour({ tour, ...props }: { tour: TourType }) {
  const getSample = () => {
    const textParts = tour.reviews.sample.slice(0, 80).split(" ");
    textParts.pop();

    return `${textParts.join(" ")}...`;
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${mq[0]} {
          flex-direction: row;
        }
      `}
      {...props}
    >
      <div
        css={css`
          display: flex;
          ${mq[0]} {
            width: 27%;
            display: flex;
            flex-direction: column;
          }
        `}
      >
        <LazyLoadImage
          css={css`
            flex-grow: 1;
            ${mq[0]} {
              height: 60%;
              max-height: 180px;
              margin-bottom: 1px;
            }
          `}
          src={tour.img_url}
          alt="tour"
        />
        <LazyLoadImage
          css={css`
            display: none;
            ${mq[0]} {
              display: block;
              height: 40%;
              max-height: 120px;
            }
          `}
          src={tour.map_url}
          alt="map"
        />
      </div>
      <div
        css={css`
          padding: 16px;
          ${mq[0]} {
            width: 48%;
            padding-top: 14px;
            padding-left: 8px;
          }
        `}
      >
        <div
          css={css`
            padding-bottom: 16px;
            border-bottom: 1px solid ${colors.separator};
            margin-bottom: 16px;
          `}
        >
          <h1
            css={css`
              text-transform: capitalize;
              font-size: 1.1rem;
              font-weight: bold;
            `}
          >
            {tour.title}
          </h1>
          <div
            css={css`
              margin-top: 8px;
              margin-bottom: 12px;
            `}
          >
            <Rating
              readonly
              fullSymbol={
                <StarFilled
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                />
              }
              emptySymbol={
                <StarOutlined
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                />
              }
              initialRating={tour.reviews.avg}
            />

            <SideInfo
              css={css`
                display: inline-block;
                margin-left: 8px;
              `}
            >
              {tour.reviews.cnt} reviews
            </SideInfo>
          </div>
          <p
            css={css`
              font-style: italic;
              ::before {
                content: '"';
              }
              ::after {
                content: '"';
              }
            `}
          >
            {getSample()}
          </p>
        </div>
        <div>
          <InfoLine
            category="destinations"
            value={tour.destinations}
            maxValues={4}
          />
          <InfoLine
            category="age range"
            value={`${tour.age_min} to ${tour.age_max} years old`}
          />
          <InfoLine category="regions" value={tour.regions} maxValues={1} />
          <InfoLine
            category="travel style"
            value={tour.travel_styles}
            maxValues={3}
          />
          <InfoLine category="operated in" value={tour.operated_in} />
        </div>
      </div>
      <div
        css={css`
          padding: 16px;
          ${mq[0]} {
            width: 27%;
            display: flex;
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              width: 50%;
            `}
          >
            <SideInfo>Tour length</SideInfo>
            <div
              css={css`
                font-weight: bold;
                margin-top: 4px;
              `}
            >
              {tour.length} days
            </div>
            <SideInfo
              css={css`
                margin-top: 8px;
              `}
            >
              Price per day
            </SideInfo>
            <div
              css={css`
                font-weight: bold;
                margin-top: 4px;
              `}
            >
              {Math.ceil(tour.price / tour.length)}€
            </div>
          </div>
          <div
            css={css`
              width: 50%;
            `}
          >
            <div>From</div>
            <div
              css={css`
                color: ${colors.price};
                font-size: 1.8rem;
                font-weight: bold;
              `}
            >
              {Math.ceil(tour.price)}€
            </div>
          </div>
        </div>
        <div
          css={css`
            text-transform: capitalize;
            font-weight: bold;
            margin-top: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
          `}
        >
          <Check
            css={css`
              width: 22px;
              height: 22px;
            `}
          />
          <span
            css={css`
              margin-left: 8px;
            `}
          >
            book with flexibility
          </span>
        </div>
        <button
          css={css`
            color: #fff;
            background-color: #0a7bbd;
            border: 1px solid #0a7bbd;
            display: inline-block;
            font-weight: 700;
            text-align: center;
            border-radius: 3px;
            outline: 0;
            margin: 0;
            text-decoration: none;
            appearance: none;
            user-select: none;
            cursor: pointer;
            font-size: 14px;
            line-height: 24px;
            position: relative;
            width: 100%;
            padding: 6px 8px;
          `}
        >
          View tour
        </button>
      </div>
    </div>
  );
}

export default Tour;
