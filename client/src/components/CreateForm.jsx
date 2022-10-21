import React from "react";
import todoStore from "../stores/todoStore";

function CreateForm() {
  const store = todoStore();

  if (store.updateForm._id) return <></>;

  return (
    <div className="row">
      <div className="col-md-6 d-flex mx-auto">
        <form className="form-control mb-3" onSubmit={store.createTodo}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              placeholder="Enter todo title (optional)"
              value={store.createForm.title}
              onChange={store.updateCreateForm}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              type="text"
              name="body"
              id="body"
              placeholder="Write todo..."
              value={store.createForm.body}
              onChange={store.updateCreateForm}
            />
          </div>
          <button className="btn green btn-lg d-flex mx-auto m-3">
            ADD TODO
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
