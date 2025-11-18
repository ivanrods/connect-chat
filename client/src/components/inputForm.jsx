const InputForm = ({ icon, type, placeholder, ...rest }) => {
  return (
    <div>
      <div>{icon}</div>
      <input type={type} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default InputForm;
