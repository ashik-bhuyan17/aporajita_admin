import Select from 'react-select';

const styles = {
  control: (base) => ({ ...base, height: 33, minHeight: 33 }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

function SingleSelectWithSearch({ options, placeholder, handleChange }) {
  return (
    <Select
      defaultValue={options[0]}
      options={options}
      placeholder={placeholder}
      classNamePrefix="react-select"
      styles={styles}
      onChange={handleChange}
    />
  );
}

export default SingleSelectWithSearch;
