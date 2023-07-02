import { ProcessingUsers } from "./ProcessingUsers";

export const getUsersDetails = (setUsers) => {
  fetch(
    `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
  )
    .then((res) => res.json())
    .then((data) => {
      setUsers(ProcessingUsers(data));
    })
    // error handling
    .catch((err) => {
      console.log("Fetching error...", err);
    });
};
