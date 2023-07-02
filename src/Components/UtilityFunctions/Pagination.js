import "../CSS/PaginationCSS.css";

const Pagination = (props) => {
  const { usersLength, setPage, page, deleteSelectedUsers } = props;

  const totalPages = Math.ceil(usersLength / 10);

  const changePage = (index) => {
    setPage(index);
  };

  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPage(index);
  };

  let pages = [];
  pages.push(
    <div
      key={-3}
      className={page === 1 ? "page disabled" : "page"}
      onClick={() => changePage(1)}
    >
      <i className="fas fa-angle-double-left">{"<<"}</i>
    </div>
  );
  pages.push(
    <div
      key={-2}
      className={page === 1 ? "page disabled" : "page"}
      onClick={() => navigatePage(page - 1)}
    >
      <i className="fas fa-angle-left">{"<"}</i>
    </div>
  );
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={page === i ? "page selected" : "page"}
      >
        {i}
      </div>
    );
  }
  pages.push(
    <div
      key={-1}
      className={page === totalPages ? "page disabled" : "page"}
      onClick={() => navigatePage(page + 1)}
    >
      <i className="fas fa-angle-right">{">"}</i>
    </div>
  );
  pages.push(
    <div
      key={0}
      className={page === totalPages ? "page disabled" : "page"}
      onClick={() => changePage(totalPages)}
    >
      <i className="fas fa-angle-double-right">{">>"}</i>
    </div>
  );

  return (
    <div className="paginationContainer wrapper">
      <button className="delete" onClick={() => deleteSelectedUsers()}>
        Delete Selected
      </button>
      <div className="pagination">{pages}</div>
    </div>
  );
};

export default Pagination;
