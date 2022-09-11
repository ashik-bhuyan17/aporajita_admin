import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CreateNewRegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.register_active) {
      data.register_active = 'Yes';
    } else {
      data.register_active = 'No';
    }
    console.log(data);
  };
  // data for select option -> start
  const outletsData = ['Dhanmondi Main Outlet', 'Chittagong Outlet'];
  // data for select option -> end
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Create New Register</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/pos/registers" className="btn btn-success">
              View All Registers
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="column-input-container">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="registerName"
                    className="form-label required row-option-title"
                  >
                    Register Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerName"
                    aria-describedby="registerName"
                    {...register('register_name', { required: true })}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="outlet"
                    className="form-label required row-option-title"
                  >
                    Select Outlet
                  </label>
                  <select
                    className="form-select"
                    id="outlet"
                    aria-label="dropdown"
                    {...register('register_outlet', { required: true })}
                  >
                    <option value="">Choose..</option>
                    {outletsData.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    className="form-check-label row-option-title"
                    htmlFor="active"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="active"
                      {...register('register_active')}
                    />
                    Active ?
                  </label>
                </div>
              </div>
            </div>

            <div className="form-submit-button-end">
              <button type="submit" className="btn btn-primary">
                Create Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewRegisterPage;
