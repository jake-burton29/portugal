import React from "react";
import Layout from "../components/layout";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { render } from "react-dom";
import { addDays } from "date-fns";
import { Calendar, Range, DateRange, DateRangePicker } from "react-date-range";
import type { RangeKeyDict } from "react-date-range";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// interface ReservationProps {
//   price: number;
//   dateRange: Range;
//   totalPrice: number;
//   onChangeDate: (value: Range) => void;
//   onSubmit: () => void;
//   disabled?: boolean;
//   disabledDates: Date[];
// }

// const Reservation: React.FC<ReservationProps> = ({
//   price,
//   dateRange,
//   totalPrice,
//   onChangeDate,
//   onSubmit,
//   disabled,

//   disabledDates,
// }) => {
//   return <DateRange />;
// };

class Book extends React.Component {
  public readonly state = {
    range: [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: "selection",
      },
    ],
  };
  render() {
    return (
      <Layout>
        <div className="w-full items-center justify-center md:flex">
          <DateRange
            editableDateInputs={true}
            onChange={(rangesByKey: RangeKeyDict) =>
              this.setState({ range: [rangesByKey.selection] })
            }
            moveRangeOnFirstSelection={false}
            ranges={this.state.range}
            months={2}
          />
          <button
            onClick={() =>
              console.log(
                this.state.range[0].startDate,
                this.state.range[0].endDate
              )
            }
          >
            123
          </button>
        </div>
      </Layout>
    );
  }
}

export default Book;
