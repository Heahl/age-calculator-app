import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import CountUp from "react-countup";

const daySchema = z.number().int().min(1).max(31);
const monthSchema = z.number().int().min(1).max(12);
const yearSchema = z.number().int().min(1925).max(2023);

export default function Home() {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [dayError, setDayError] = useState<string>("");
  const [monthError, setMonthError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");
  const [daysResult, setDaysResult] = useState<number>(0);
  const [monthsResult, setMonthsResult] = useState<number>(0);
  const [yearsResult, setYearsResult] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const calculateAge = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const diff = currentDate.getTime() - birthDate.getTime();
    const ageDate = new Date(diff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate();
    setFormSubmitted(true);
    setDaysResult(days);
    setMonthsResult(months);
    setYearsResult(years);
  };

  const validateDate = (day: number, month: number, year: number) => {
    let isValid = true;

    if (!day) {
      setDayError("This field is required");
      isValid = false;
    } else {
      const dayResult = daySchema.safeParse(day);
      setDayError(dayResult.success ? "" : "Must be a valid day");
      if (!dayResult.success) isValid = false;
    }

    if (!month) {
      setMonthError("This field is required");
      isValid = false;
    } else {
      const monthResult = monthSchema.safeParse(month);
      setMonthError(monthResult.success ? "" : "Must be a valid month");
      if (!monthResult.success) isValid = false;
    }

    if (!year) {
      setYearError("This field is required");
      isValid = false;
    } else {
      const yearResult = yearSchema.safeParse(year);
      setYearError(yearResult.success ? "" : "Must be in the past");
      if (!yearResult.success) isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateDate(day, month, year)) {
      calculateAge(e);
    }
  };

  return (
    <>
      <Head>
        <title>Age Calculator</title>
        <meta name="description" content="age-calculator-app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-off-white font-poppins">
        {/* Calculator App Container */}
        <div className="rounded-br-4xl mt-28 flex h-[80%] w-[90%] min-w-[390px] flex-col rounded-3xl bg-white px-6 py-12 md:justify-center">
          {/* Input Form */}
          <form className="flex w-full flex-col" onSubmit={handleSubmit}>
            <div className="flex w-[300px] justify-start gap-4 md:w-full">
              {/* Day Input */}
              <div className="flex flex-col gap-1 md:w-1/5">
                <label
                  htmlFor="day"
                  className={`text-sm ${dayError ? "text-light-red" : ""} font-bold uppercase tracking-widest text-smokey-grey`}
                >
                  Day
                </label>
                <input
                  placeholder="DD"
                  type="number"
                  id="day"
                  max={31}
                  min={1}
                  onChange={(e) => setDay(parseInt(e.target.value))}
                  name="day"
                  className={`${dayError ? "border-light-red" : ""} h-14 w-24 rounded-md border border-light-grey px-4 py-2 text-xl font-bold text-off-black md:h-20 md:w-full md:text-3xl`}
                />
                {dayError && (
                  <p className="text-sm text-light-red">{dayError}</p>
                )}
              </div>
              {/* Month Input */}
              <div className="flex flex-col gap-1 md:w-1/5">
                <label
                  htmlFor="month"
                  className={`text-sm ${monthError ? "text-light-red" : ""} font-bold uppercase tracking-widest text-smokey-grey`}
                >
                  Month
                </label>
                <input
                  placeholder="MM"
                  type="number"
                  id="month"
                  max={12}
                  min={1}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  name="month"
                  className={` ${monthError ? "border-light-red" : ""} h-14 w-24 rounded-md border border-light-grey px-4 py-2 text-xl font-bold text-off-black md:h-20 md:w-full md:text-3xl`}
                />
                {monthError && (
                  <p className="text-sm text-light-red">{monthError}</p>
                )}
              </div>
              {/* Year Input */}
              <div className="flex flex-col gap-1 md:w-1/5">
                <label
                  htmlFor="year"
                  className={`text-sm ${yearError ? "text-light-red" : ""} font-bold uppercase tracking-widest text-smokey-grey`}
                >
                  Year
                </label>
                <input
                  placeholder="YYYY"
                  type="number"
                  id="year"
                  max={2023}
                  min={1925}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  name="year"
                  className={`${yearError ? "border-light-red" : ""} h-14 w-28 rounded-md border border-light-grey px-4 py-2 text-xl font-bold text-off-black md:h-20 md:w-full md:text-3xl`}
                />
                {yearError && (
                  <p className="text-sm text-light-red">{yearError}</p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-center border-b-2 md:justify-end">
              <button
                type="submit"
                className="translate-y-1/2 rounded-full bg-purple p-4 md:flex md:h-24 md:w-24 md:items-center md:justify-center"
              >
                <Image
                  src={"/images/icon-arrow.svg"}
                  width={40}
                  height={40}
                  alt="Arrow Icon"
                />
              </button>
            </div>
          </form>
          {/* Result */}
          <div className="mt-16 grid grid-cols-4 gap-4">
            {/* Years Result */}
            <div className="flex justify-end">
              <h1 className="text-6xl font-extrabold italic text-purple md:text-8xl">
                {!formSubmitted ? "--" : <CountUp end={yearsResult} />}
              </h1>
            </div>
            <div className="col-span-3 flex">
              <h1 className="text-6xl font-extrabold italic md:text-8xl">
                years
              </h1>
            </div>
            {/* Months Result */}
            <div className="flex justify-end">
              <h1 className="text-6xl font-extrabold italic text-purple md:text-8xl">
                {!formSubmitted ? "--" : <CountUp end={monthsResult} />}
              </h1>
            </div>
            <div className="col-span-3 flex">
              <h1 className="text-6xl font-extrabold italic md:text-8xl">
                months
              </h1>
            </div>
            {/* Days Result */}
            <div className="flex justify-end">
              <h1 className="text-6xl font-extrabold italic text-purple md:text-8xl">
                {!formSubmitted ? "--" : <CountUp end={daysResult} />}
              </h1>
            </div>
            <div className="col-span-3 flex">
              <h1 className="text-6xl font-extrabold italic md:text-8xl">
                days
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
