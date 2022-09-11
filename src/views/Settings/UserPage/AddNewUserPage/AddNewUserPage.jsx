import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function AddNewUserPage() {
  //axios
  axios.defaults = 'http://localhost:8000';

  //hooks
  const {
    register: profile_info,
    handleSubmit: handleSubmitProfileInfo,
    formState: { errors_profile },
  } = useForm();
  const {
    register: roles,
    handleSubmit: handleSubmitRoles,
    formState: { errors_roles },
  } = useForm();

  //handlers
  const onSubmitProfileInfo = (data) => {
    console.log(data);
  };
  const onSubmitRole = (data) => {
    console.log(data);
  };
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.prevent.Default();
    }
  };

  return (
    <div className="page-container-scroll">
      <div className="page-container">
        <div className="page-header-container row">
          <h1 className="page-title col-xs-12 col-md-6">Add New User</h1>
          <div className="page-header-button-container col-xs-12 col-md-6">
            <Link to="/admin/users" className="btn btn-primary">
              View All Users
            </Link>
          </div>
        </div>

        <div className="panel-container">
          <form
            onSubmit={handleSubmitProfileInfo(onSubmitProfileInfo)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className="row">
              <div className="page-header-button-container">
                <button className="btn btn-primary">Send Invite</button>
              </div>
              <div className="col-xs-12 col-md-3">
                <p
                  className="setting-page-container-title"
                  style={{ marginTop: '0px' }}
                >
                  Profile Info
                </p>
              </div>
              <div className="col-xs-12 col-md-9"></div>
            </div>
          </form>
          <hr className="light-grey" />
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <p
                className="setting-page-container-title"
                style={{ marginTop: '0px' }}
              >
                Roles
              </p>
            </div>
            <div className="col-xs-12 col-md-9"></div>
            <div className="form-submit-button-end">
              <button className="btn btn-primary">Send Invite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewUserPage;
