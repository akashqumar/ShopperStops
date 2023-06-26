import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { Badge, Dropdown } from "rsuite";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import logo from "../assets/images/logo.svg";
import { Button, Space } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <NavLink to="/" className="navbar-brand" href="#">
          <img src={logo} className="logo" alt="Logo" />
          </NavLink>
          <Button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <SearchInput />
              <li>
                <Button type="text" className="centered-text" >
                  <NavLink to="/" className="nav-link active" href="#">
                    HOME <span className="sr-only"></span>
                  </NavLink>
                </Button>
              </li>
              <Dropdown title={"CATEGORY"}>
                <Dropdown.Item>
                  <Link to={`/category`} className="dropdown-item">
                    All Category
                  </Link>
                </Dropdown.Item>
                {categories?.map((c) => (
                  <Dropdown.Item>
                    <Link to={`/category/${c.slug}`} className="dropdown-item">
                      {c.name}
                    </Link>
                  </Dropdown.Item>
                ))}
              </Dropdown>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                  <Button type="text" className="centered-text" >
                    <NavLink to="/register" className="nav-link active">
                      REGISTER
                    </NavLink>
                    </Button>
                  </li>
                  <li className="nav-item">
                  <Button type="text" className="centered-text" >
                    <NavLink to="/login" className="nav-link active">
                      LOGIN
                    </NavLink>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <Dropdown title={auth?.user?.name}>
                    <Dropdown.Item>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </Dropdown.Item>
                  </Dropdown>
                </>
              )}

              <li>
                <Space wrap>
                  <Badge content={cart?.length} showZero>
                    <Button type="text" className="centered-text">
                      <NavLink to="/cart" className="nav-link active">
                        CART
                      </NavLink>
                    </Button>
                  </Badge>
                </Space>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default Header;
