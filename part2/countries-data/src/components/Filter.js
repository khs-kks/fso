const Filter = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Country Name"
      id="filter"
    ></input>
  );
};

export default Filter;
