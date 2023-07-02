import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import "./CSS/UsersList.css";

const UsersList = (props) => {
  const { user, deleteUser, editUser, saveUser, selectUser } = props;

  return (
    <>
      <tr key={user.id} className={user.selected ? "selectedchange" : ""}>
        <td>
          <input
            id={user.id}
            type="checkbox"
            onChange={() => selectUser(user.id)}
            checked={user.selected}
          ></input>
        </td>

        <td>
          <input
            className={user.edit ? "editable" : "readOnly"}
            readOnly={!user.edit}
            type="text"
            name="name"
            defaultValue={user.name}
          ></input>
        </td>
        <td>
          <input
            className={user.edit ? "editable" : "readOnly"}
            readOnly={!user.edit}
            type="email"
            name="email"
            defaultValue={user.email}
          />
        </td>
        <td>
          <input
            className={user.edit ? "editable" : "readOnly"}
            readOnly={!user.edit}
            type="text"
            name="role"
            defaultValue={user.role}
          />
        </td>

        <td className="icons">
          {user.edit ? (
            <button className="tooltip" onClick={() => saveUser(user.id)}>
              <AiFillSave />
              <span class="tooltiptext">Save</span>
            </button>
          ) : (
            <button className="tooltip" onClick={() => editUser(user.id)}>
              <AiFillEdit />
              <span class="tooltiptext">Edit</span>
            </button>
          )}

          <button className="tooltip" onClick={() => deleteUser(user.id)}>
            <AiFillDelete /> <span class="tooltiptext">Delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default UsersList;
