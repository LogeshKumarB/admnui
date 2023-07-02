import React, { useEffect, useRef, useState } from "react";
import { config } from "./PageCount";
import { getUsersDetails } from "./UtilityFunctions/FetchUsers";
import UsersList from "./UsersList";
import Pagination from "./UtilityFunctions/Pagination";
import "./CSS/AdminUI.css";

const AdminUI = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);
  let startIndex = (page - 1) * config.PAGE_COUNT;

  // default fetch effect from API...
  useEffect(() => {
    getUsersDetails(setUsers);
  }, []);

  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  const searchUsers = (searchValue) => {
    let tempSearch = searchValue.toLowerCase();
    setPage(1);
    setUsers(
      users.map((user) => {
        if (
          user.name.toLowerCase().includes(tempSearch) ||
          user.email.toLowerCase().includes(tempSearch) ||
          user.role.toLowerCase().includes(tempSearch)
        ) {
          user.show = true;
          return user;
        }
        user.show = false;
        return user;
      })
    );
  };

  // handling select single user for delete...
  const handleSelectUser = (index) => {
    setUsers(
      users.map((user) =>
        user.id === index ? { ...user, selected: !user.selected } : user
      )
    );
  };

  // Delete data of single User onClick...
  const deleteUser = (index) => {
    let usersAfterDeletion = users.filter((user) => {
      return user.id !== index;
    });
    setUsers(usersAfterDeletion);
  };
  let fillRows = [];
  for (
    let i = users
      .filter((user) => user.show)
      .slice(startIndex, startIndex + config.PAGE_COUNT).length;
    i < config.PAGE_COUNT;
    i++
  ) {
    fillRows.push(
      <>
        <tr key={i}></tr>
      </>
    );
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS IN THE SYSTEM</div>;
  }

  // handling select all users of the entire page...
  const handleSelectAll = (e) => {
    let tempUser = users
      .slice(startIndex, startIndex + config.PAGE_COUNT)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (tempUser.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
  };

  // deleteSelectedUsers from the page...
  const deleteSelectedUsers = () => {
    setUsers((prevState) => prevState.filter((user) => !user.selected));
    selectAllRef.current.checked = false;
  };

  // editing temporarily the user data on UI ...
  const editUser = (index) => {
    setUsers(
      users.map((user) =>
        user.id === index ? { ...user, edit: !user.edit } : user
      )
    );
  };

  // Saving the edited items temporarily in the DOM...
  const saveUser = (index) => {
    setUsers(
      users.map((user) =>
        user.id === index ? { ...user, edit: !user.edit } : user
      )
    );
  };

  // UI rendering component...
  return (
    <>
      <div className="searchbox">
        <input
          className="search"
          type="text"
          placeholder="Search by name, email or role...."
          onChange={(e) => searchUsers(e.target.value)}
        ></input>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                ref={selectAllRef}
                onChange={(e) => {
                  handleSelectAll(e);
                }}
                name="selectAll"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user) => user.show)
            .slice(startIndex, startIndex + config.PAGE_COUNT)
            .map((user) => {
              return user.show ? (
                <UsersList
                  selectUser={handleSelectUser}
                  saveUser={saveUser}
                  editUser={editUser}
                  deleteUser={deleteUser}
                  user={user}
                ></UsersList>
              ) : (
                ""
              );
            })}
          {fillRows}
        </tbody>
      </table>

      <Pagination
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        deleteSelectedUsers={deleteSelectedUsers}
      ></Pagination>
    </>
  );
};

export default AdminUI;
