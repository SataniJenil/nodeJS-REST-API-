import mongoose from "mongoose";
const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  jobTitle: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  hireDate: {
    type: Number,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});
const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
