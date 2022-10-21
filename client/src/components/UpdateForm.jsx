/* UpdateForm component returns a form to update a todo */
import React from "react";
import todosStore from "../stores/todoStore";

function UpdateForm() {
  const store = todosStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div className="row">
      <div className="col-md-6 d-flex mx-auto">
        <form className="form-control mb-3" onSubmit={store.updateTodo}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              type="text"
              name="title"
              id="title"
              value={store.updateForm.title}
              placeholder="Edit title (optional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Edit Todo Description</label>
            <textarea
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              type="text"
              name="body"
              id="body"
              value={store.updateForm.body}
              placeholder="Enter a description"
            />
          </div>
          <button className="btn green btn-lg d-flex mx-auto m-3">
            UPDATE TODO
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
