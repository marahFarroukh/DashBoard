import Form from "../components/Form";

function Register() {
  const inputs = [
    {
      tit: "First Name: ",
      type: "text",
      placeholder: "first name",
      name: "first_name",
    },
    {
      tit: "Last Name: ",
      type: "text",
      placeholder: "last name",
      name: "last_name",
    },
    {
      tit: "User Name: ",
      type: "text",
      placeholder: "user name",
      name: "user_name",
    },
    {
      tit: "Email address: ",
      type: "email",
      placeholder: "Example@gmail.com",
      name: "email",
    },
    {
      tit: "Password: ",
      type: "password",
      placeholder: "********",
      name: "password",
    },
    {
      tit: "Confirmation Password: ",
      type: "confirmation password",
      placeholder: "********",
      name: "confirmation_password",
    },
    {
      tit: "Profile Image: ",
      type: "file",
      name: "profile_image",
    },
  ];
  return (
    <div>
      <Form
        title="Create an Account"
        descrip="Create an account to continue"
        inputs={inputs}
        btn="Sign Up"
        ques="Already have an account?"
        url="https://vica.website/api/register"
        type="register"
      />
    </div>
  );
}

export default Register;
