import { parseISO, format } from "date-fns";

interface DateProps {
  startDate?: string;
  endDate?: string;
}

export const DateRange = ({ startDate, endDate }: DateProps): JSX.Element => {
  const start = startDate ? parseISO(startDate) : "";
  const end = endDate ? parseISO(endDate) : "";

  // Completed term
  if (start && end) {
    return (
      <time dateTime={startDate}>{`${format(start, "LLLL d, yyyy")} ➪ ${format(
        end,
        "LLLL d, yyyy"
      )}`}</time>
    );
  }
  // No endDate
  if (start && !end) {
    return (
      <time dateTime={startDate}>{`${format(
        start,
        "LLLL d, yyyy"
      )} ➪ Now`}</time>
    );
  }

  return null;
};
