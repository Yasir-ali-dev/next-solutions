import React, { useState } from "react";
import SelectComponent from "../../components/SelectComponent";
import { Button, Form } from "react-bootstrap";
import { locations, payrolls } from "../../utils/employeeData";
import "../../index.css";
import EmployeeHeader from "../../components/EmployeeHeader";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textTransform: "capitalize",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    textTransform: "capitalize",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

const TimeAttendencePrint = () => {
  const [timeAttendence, setTimeAttendence] = useState({
    subsidiary: "",
    location: "",
    payroll: "",
    department: "",
    payroll_period: "",
    employee: "",
  });
  const [pdfVisible, setPdfVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeAttendence((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPdfVisible(true);
  };

  return (
    <div className="ubuntu">
      <div>
        <EmployeeHeader
          btnText={"Back"}
          renderTo={"/hr/timeAttendenceRegister"}
          title={"Generate Attendence Register"}
        />
      </div>
      <div className="d-flex">
        <div className="col-4">
          <h3 className="text-start ps-3 bg p-1">Parameters</h3>
          <Form
            className="p-3 d-flex gap-4 justify-content-start 
          align-items-center flex-wrap"
            onSubmit={handleSubmit}
          >
            <SelectComponent
              title={"subsidiary"}
              values={["multi-techno", "e-networks"]}
              handleChange={handleChange}
              value={timeAttendence.subsidiary}
            />
            <SelectComponent
              title={"location"}
              handleChange={handleChange}
              values={locations}
              value={timeAttendence.location}
            />
            <SelectComponent
              title={"payroll"}
              handleChange={handleChange}
              values={payrolls}
              value={timeAttendence.payroll}
            />
            <SelectComponent
              title={"department"}
              handleChange={handleChange}
              values={["sales", "human resource", "operations"]}
              value={timeAttendence.department}
            />
            <SelectComponent
              title={"payroll_period"}
              values={["month", "week", "3 days"]}
              handleChange={handleChange}
              value={timeAttendence.payroll_period}
            />
            <SelectComponent
              title={"employee"}
              handleChange={handleChange}
              values={["haris", "kaleem"]}
              value={timeAttendence.employee}
              required={true}
            />

            <Button size="sm" variant="outline-primary" type="submit">
              Generate Register
            </Button>
          </Form>
        </div>
        <PDFViewer className="col-8" style={{ height: "90vh" }}>
          <Document>
            <Page size="A4" style={pdfStyles.body}>
              {pdfVisible && (
                <>
                  <Text style={pdfStyles.author}>
                    ~ Created with next-solution ~
                  </Text>
                  <Text style={pdfStyles.title}>
                    ~ Created with next-solution ~
                  </Text>
                  <Text style={pdfStyles.subtitle}>
                    employee: {timeAttendence.employee}
                  </Text>
                  <Text style={pdfStyles.text}>
                    subsidiary: {timeAttendence.subsidiary}
                  </Text>
                  <Text style={pdfStyles.text}>
                    location: {timeAttendence.location}
                  </Text>
                  <Text style={pdfStyles.text}>
                    payroll: {timeAttendence.payroll}
                  </Text>
                  <Text style={pdfStyles.text}>
                    department: {timeAttendence.department}
                  </Text>
                  <Text style={pdfStyles.text}>
                    payroll_period: {timeAttendence.payroll_period}
                  </Text>
                </>
              )}
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

export default TimeAttendencePrint;
