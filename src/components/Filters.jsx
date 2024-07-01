import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormDatePicker from "./FormDatePicker";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState(["all"]);
  const [selectBrandList, setSelectBrandList] = useState(["all"]);

  return (
    <Form className="bg-base-200 rounded-t-md px-8 py-4 flex flex-col gap-8 items-center">
      <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center gap-4">
        <FormInput
          type="search"
          label="დოკუმენტის სახელი"
          name="search"
          size="input-sm"
          defaultValue=""
          className="md:flex-1"
        />
        <FormDatePicker label="თარიღი" name="date" className="md:flex-1" />
        <FormDatePicker label="თარიღი" name="date" className="md:flex-1" />
      </div>
      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm mx-2"
        >
          ძებნა
        </button>
        <Link to="/shop?page=1" className="btn btn-primary btn-sm mx-2">
          Reset
        </Link>
      </div>
    </Form>
  );
};

export default Filters;
