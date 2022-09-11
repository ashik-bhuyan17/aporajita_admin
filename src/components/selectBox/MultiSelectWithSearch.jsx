import Select from 'react-select';

function MultiSelectWithSearch({ options, placeholder }) {
  return (
    <Select
      isMulti
      options={options}
      placeholder={placeholder}
      classNamePrefix="react-select"
    />
  );
}

export default MultiSelectWithSearch;
