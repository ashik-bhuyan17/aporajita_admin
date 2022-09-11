import { FaRegSadTear } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <div className="page-container">
      <div className="panel-container">
        <div className="page-404-container">
          <img
            src="assets/svg/warning.svg"
            alt="404"
            className="page-404-img"
          />

          <h5 className="page-404-message">
            {' '}
            <FaRegSadTear /> Not Found
          </h5>
        </div>
      </div>
    </div>
  );
}
