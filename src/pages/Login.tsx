import Form from "../components/Form";
interface inputElements {
  tit?: string;
  type?: string;
  placeholder?: string;
  name: string;
}
function Login() {
  const inputs: inputElements[] = [
    {
      tit: "Email Address",
      type: "email",
      placeholder: "example@gmail.com",
      name: "email",
    },
    {
      tit: "Password",
      type: "password",
      placeholder: "********",
      name: "password",
    },
  ];
  return (
    <>
      <Form
        title="Login to Account"
        descrip="have you any account"
        inputs={inputs}
        btn="Sign In"
        ques="Don't have an account"
        url="https://vica.website/api/login"
        type="login"
      />
    </>
  );
}
export default Login;
