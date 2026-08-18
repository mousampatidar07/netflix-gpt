export const checkValidation = (email,password)=>{
const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isPasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(!isEmailvalid) return "Email is not valid";
if(!isPasswordvalid) return "password is not valid";

return null;
}