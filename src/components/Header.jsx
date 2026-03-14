const Header = ({ firstName, lastName }) => {
  return (
    <div className="header">
      <h1>Sheer Health Timeline</h1>
      <span className="account-name">
        Welcome Back, {firstName} {lastName}
      </span>
    </div>
  );
};

export default Header;
