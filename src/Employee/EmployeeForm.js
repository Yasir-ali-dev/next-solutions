import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import "../index.css";
import EmployeeList from "./EmployeeList";
const validNationalities = [
  "Pakistani",
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabé",
  "Burmese",
  "Burundian",
  "Cabo Verdean",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirati",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guinea-Bissauan",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakh",
  "Kenyan",
  "Kiribati",
  "Kittitian",
  "Kosovar",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtenstein",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Norwegian",
  "Omani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Philippine",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamese",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbek",
  "Vanuatuan",
  "Venezuelan",
  "Vietnamese",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];
const designations = ["Web Developer", "Software Engineer", "Sales"];
const employeeTypes = [
  "Full-time",
  "Part-time",
  "Temporary",
  "Seasonal",
  "Leased",
  "At-will",
];
const EmployeeForm = () => {
  function validateNationality(nationality) {
    const normalizedNationality = nationality.trim().toLowerCase();
    return validNationalities
      .map((n) => n.toLowerCase())
      .includes(normalizedNationality);
  }
  function validateCNIC(cnic) {
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    return cnicPattern.test(cnic);
  }

  return (
    <Container className="ubuntu">
      <Formik
        initialValues={{
          hired_date: "",
          name: "",
          birth_date: "",
          religion: "",
          cnic: "",
          guardian: "",
          gender: "Male",
          nationality: "",
          city: "",
          state: "",
          email: "",
          zipcode: "",
          phone: "",
          current_address: "",
          permanent_address: "",
          designation: "",
          department_name: "",
          employee_type: "",
          location_name: "",
          work_calander: "",
          payroll: "",
          working_status: "",
          employee_grade: "",
          supervisor: "",
          is_sales_representative: false,
          is_delivery_man: false,
        }}
        validate={(values) => {
          const regex = /^\+\d{1,3}\d{10}$/;
          const zipCodePattern = /^\d{5}(-\d{4})?$/;

          const errors = {};
          if (!values.hired_date) {
            errors.hired_date = "hired date is required";
          } else if (!values.name) {
            errors.name = "name is required";
          } else if (!values.department_name) {
            errors.department_name = "department name is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "invalid email address";
          } else if (!regex.test(values.phone)) {
            errors.phone = "Invalid phone number";
          } else if (!zipCodePattern.test(values.zipcode)) {
            errors.zipcode = "invalid zipcode";
          } else if (!validateNationality(values.nationality)) {
            errors.nationality = "invalid nationality";
          } else if (!validateCNIC(values.cnic)) {
            errors.cnic = "invalid cnic";
          } else if (!values.employee_type) {
            errors.employee_type = "employee type is required";
          } else if (!values.payroll) {
            errors.payroll = "payroll is required";
          } else if (!values.working_status) {
            errors.working_status = "working status is required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h4 className="text-start py-2 px-2 form-heading-color">
              Employee Personal Information
            </h4>
            <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
              <div className="d-flex  justify-content-start  gap-2 align-items-center">
                <label htmlFor="name">
                  {" "}
                  <sup className="star">*</sup> Full Name{" "}
                </label>
                <Field type="text" name="name" className="px-2 form-width" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="hired_date">
                  <sup className="star">*</sup> Hired Date{" "}
                </label>
                <Field
                  type="date"
                  name="hired_date"
                  placeholder="Enter your Hired Date"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="hired_date"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start gap-2 align-items-center">
                <label htmlFor="birth_date">
                  <sup className="star">*</sup> Birth Date{" "}
                </label>
                <Field
                  type="date"
                  name="birth_date"
                  placeholder="Enter your Birth Date"
                  className=" px-2 form-width"
                />
              </div>

              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="religion"> Religion </label>
                <Field
                  type="text"
                  name="religion"
                  className=" px-2 form-width"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center ">
                <label htmlFor="gender"> Gender: </label>
                <div
                  role="group"
                  className="d-flex gap-4"
                  aria-labelledby="my-radio-group"
                >
                  <div>
                    <label>Male</label>{" "}
                    <Field type="radio" name="gender" value="Male" />
                  </div>
                  <div>
                    <label>Female </label>{" "}
                    <Field type="radio" name="gender" value="Female" />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-start gap-2  align-items-center">
                <label htmlFor="guardian"> Guardian </label>
                <Field
                  type="text"
                  name="guardian"
                  className=" px-2 form-width"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="cnic"> CNIC </label>
                <Field
                  type="text"
                  name="cnic"
                  placeholder="xxxxx-xxxxxx-x"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="cnic"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <h4 className="text-start mt-5 py-2 px-2 form-heading-color">
              Employee Address Information
            </h4>
            <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
              <div className="d-flex gap-2 justify-content-start align-items-center pe-3">
                <label htmlFor="nationality"> Nationality </label>
                <Field
                  component="select"
                  className="py-1 form-width"
                  name="nationality"
                >
                  {validNationalities.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="nationality"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="city">City </label>
                <Field type="text" name="city" className="px-2 form-width" />
              </div>
              <div className="d-flex pe-3 justify-content-start  gap-2 align-items-center">
                <label htmlFor="state"> State </label>
                <Field type="text" name="state" className="px-2 form-width" />
              </div>
              <div className="d-flex pe-3 justify-content-end  gap-2 align-items-center">
                <label htmlFor="email"> Email </label>
                <Field type="email" name="email" className="px-2 form-width" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="zipcode"> Zipcode </label>
                <Field
                  type="number"
                  name="zipcode"
                  className="px-2 form-width"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="phone"> Phone </label>
                <Field
                  type="text"
                  placeholder="+00 000 0000000"
                  name="phone"
                  className="px-2 form-width"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="current_address"> Current Address </label>
                <Field
                  type="text"
                  name="current_address"
                  className="form-width px-2"
                />
              </div>
              <div className="d-flex gap-3 pe-3 justify-content-start align-items-center">
                <label htmlFor="permanent_address"> Permanent Address </label>
                <Field
                  type="text"
                  name="permanent_address"
                  className="form-width px-2"
                />
              </div>
            </div>
            <h4 className="text-start mt-5 py-2 px-2 form-heading-color">
              Job details
            </h4>
            <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
              <div className="d-flex  justify-content-start  gap-2 align-items-center">
                <label htmlFor="designation"> Designation </label>
                <Field
                  component="select"
                  name="designation"
                  className="px-2 form-width py-1"
                >
                  {designations.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="department_name">
                  <sup className="star">*</sup> Department Name{" "}
                </label>
                <Field
                  type="text"
                  name="department_name"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="department_name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start gap-2 align-items-center">
                <label htmlFor="employee_type">
                  <sup className="star">*</sup> Employee Type{" "}
                </label>
                <Field
                  component="select"
                  name="employee_type"
                  className="px-2 form-width py-1"
                >
                  {employeeTypes.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="employee_type"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="location_name"> Location Name </label>
                <Field
                  component="select"
                  name="location_name"
                  className="px-2 form-width py-1"
                >
                  {["Head Office", "Branch"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="d-flex justify-content-start gap-2  align-items-center">
                <label htmlFor="work_calander"> Work Calander </label>
                <Field
                  component="select"
                  name="work_calander"
                  className="px-2 form-width py-1"
                >
                  {["Morning Shift", "Night Shift"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="payroll">
                  <sup className="star">*</sup> Define Payroll{" "}
                </label>
                <Field
                  component="select"
                  name="payroll"
                  className="px-2 form-width py-1"
                >
                  {["Daily Wages", "Hourly Wages", "Monthly Payroll"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
                <ErrorMessage
                  name="payroll"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="working_status">
                  <sup className="star">*</sup> Working Status{" "}
                </label>
                <Field
                  component="select"
                  name="working_status"
                  className="px-2 form-width py-1"
                >
                  {["Working", "Freezed", "Transferred", "Terminated"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
                <ErrorMessage
                  name="working_status"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="employee_grade"> Employee Grade </label>
                <Field
                  component="select"
                  name="employee_grade"
                  className="px-2 form-width py-1"
                >
                  {["Grade 1", "Grade 2", "Grade 3", "Grade 4"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="supervisor"> Supervisor </label>
                <Field
                  component="select"
                  name="supervisor"
                  className="px-2 form-width py-1"
                >
                  {["CTO", "Lead", "Manager", "CEO"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="d-flex gap-2 justify-content-start align-items-center">
                <Field type="checkbox" name="is_sales_representative"></Field>
                <label htmlFor="is_sales_representative">
                  {" "}
                  Is Sales Representative{" "}
                </label>
              </div>

              <div className="d-flex gap-2 justify-content-start align-items-center">
                <Field type="checkbox" name="is_delivery_man"></Field>
                <label htmlFor="is_delivery_man"> Is Delivery Man </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-custom mt-4"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <EmployeeList />
    </Container>
  );
};

export default EmployeeForm;
