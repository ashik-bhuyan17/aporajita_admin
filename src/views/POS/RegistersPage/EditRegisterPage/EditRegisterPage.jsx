import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function EditRegisterPage() {
  // hooks
  const location = useLocation();
  const previousData = location.state;
  // making ready to intialize previousData
  if (previousData.active === 'Yes') {
    previousData.active = true;
  } else if (previousData.active === 'No') {
    previousData.active = false;
  }

  console.log(previousData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      register_name: previousData.register_name,
      register_active: previousData.active,
      register_outlet: previousData.outlet_name,
    },
  });
  const onSubmit = (data) => {
    if (data.register_active) {
      data.register_active = 'Yes';
    } else {
      data.register_active = 'No';
    }
    console.log(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  // data for select option -> start
  const outletsData = ['Dhanmondi Main Outlet', 'Chittagong Outlet'];
  // data for select option -> end
  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Edit Register</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/pos/registers" className="btn btn-success">
              View All Registers
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
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
                    id="registerName"
                    aria-describedby="registerName"
                    {...register('register_name', { required: true })}
                    className={`form-control ${
                      errors.register_name ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.register_name && "Can't be empty"}
                  </div>
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="outlet"
                    className="form-label required row-option-title"
                  >
                    Select Outlet
                  </label>
                  <select
                    id="outlet"
                    aria-label="dropdown"
                    className={`form-select ${
                      errors.register_outlet ? 'is-invalid' : ''
                    }`}
                    {...register('register_outlet', { required: true })}
                  >
                    <option value="">Choose..</option>
                    {outletsData.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.register_outlet && "Can't be empty"}
                  </div>
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
                Save Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRegisterPage;
