import { createRef, useEffect, useRef, useState } from 'react';
function Pagination({
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  gotoPage,
  totalPage,
}) {
  //maximum number of buttons
  const maxPaginationNumberButtons = 7;
  //refs
  const paginationNumbersRef = useRef([]);
  //state
  const [paginationStartNumberIndex, setPaginationStartNumberIndex] =
    useState(0);
  const [currentPageNumberIndex, setCurrentPageNumberIndex] = useState(0);
  const [paginationNumbers, setPaginationNumbers] = useState([]);
  //handlers
  const generatePaginationNumberButtons = () => {
    let numbers = [];
    for (let i = 0; i < totalPage; i++) {
      numbers.push(i + 1);
    }
    setPaginationNumbers(numbers);
  };
  const getSliceOfPaginationNumberButtons = (startAt) => {
    return paginationNumbers.slice(
      startAt,
      startAt + maxPaginationNumberButtons
    );
  };
  const changePaginationButtonColor = (pageNumber) => {
    let activeIndex;
    let indexToRemoveActive = [];
    for (let i = 0; i < paginationNumbersRef.current.length; i++) {
      if (paginationNumbersRef.current[i].current.innerText != pageNumber) {
        indexToRemoveActive.push(i);
      } else {
        activeIndex = i;
      }
    }
    for (let i = 0; i < indexToRemoveActive.length; i++) {
      paginationNumbersRef.current[
        indexToRemoveActive[i]
      ].current.classList.remove('active');
    }
    paginationNumbersRef.current[activeIndex].current.classList.add('active');
  };
  useEffect(() => {
    generatePaginationNumberButtons();
    if (paginationNumbersRef.current.length !== 0)
      changePaginationButtonColor(currentPageNumberIndex + 1);
  }, [
    paginationStartNumberIndex,
    paginationNumbersRef.current.length,
    currentPageNumberIndex,
  ]);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm">
        <li
          className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}
          onClick={() => {
            gotoPage(0);
            setPaginationStartNumberIndex(0);
            setCurrentPageNumberIndex(0);
          }}
        >
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}
          onClick={() => {
            previousPage();
            if (
              canPreviousPage &&
              paginationStartNumberIndex - 1 > maxPaginationNumberButtons
            ) {
              setPaginationStartNumberIndex(paginationStartNumberIndex - 1);
            }
            setCurrentPageNumberIndex(currentPageNumberIndex - 1);
          }}
        >
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </a>
        </li>
        {getSliceOfPaginationNumberButtons(paginationStartNumberIndex).map(
          (number, index) => {
            const newRef = createRef();
            paginationNumbersRef.current[index] = newRef;
            return (
              <li
                key={index}
                ref={paginationNumbersRef.current[index]}
                className="page-item page-number"
                onClick={() => {
                  gotoPage(number - 1);
                  setCurrentPageNumberIndex(number - 1);
                }}
              >
                <a className="page-link" href="#">
                  {number}
                </a>
              </li>
            );
          }
        )}
        <li
          className={`page-item ${!canNextPage ? 'disabled' : ''}`}
          onClick={() => {
            nextPage();
            if (
              canNextPage &&
              paginationStartNumberIndex + 1 == maxPaginationNumberButtons
            ) {
              setPaginationStartNumberIndex(paginationStartNumberIndex - 1);
            }
            setCurrentPageNumberIndex(currentPageNumberIndex + 1);
          }}
        >
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">›</span>
          </a>
        </li>
        <li
          className={`page-item ${!canNextPage ? 'disabled' : ''}`}
          onClick={() => {
            gotoPage(totalPage - 1);
            setPaginationStartNumberIndex(
              totalPage - maxPaginationNumberButtons
            );
            setCurrentPageNumberIndex(totalPage - 1);
          }}
        >
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
