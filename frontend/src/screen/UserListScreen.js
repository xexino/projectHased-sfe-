import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";

function UserListScreen() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history(`/login`);
    }
  }, [dispatch, history, successDelete ,userInfo]);
  const deletHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <section className="page-header page-header--events">
        <div className="gradient-overlay"></div>
        <div className="row page-header__content">
          <div className="column">
            <h2>USERS</h2>
          </div>
        </div>
      </section>
      <section className="page-content">
        <div className="w-75 mx-auto">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="m-3">{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      {user.isAdmin ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-check text-danger"></i>
                      )}
                    </td>
                    <td className="text-center">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <Button
                          variant="light"
                          className="bttnpers bg-secondary"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="bttnpers bg-danger"
                        onClick={() => deletHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </section>
    </>
  );
}

export default UserListScreen;
