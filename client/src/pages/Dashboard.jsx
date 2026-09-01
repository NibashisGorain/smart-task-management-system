import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskChart from "../components/TaskChart";
import PriorityChart from "../components/PriorityChart";

function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);




  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const dueTodayCount = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed")
      return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate.getTime() === today.getTime();
  }).length;

  console.log("Due Today Count:", dueTodayCount);

  useEffect(() => {
    if (dueTodayCount > 0) {
      toast.warning(
        `⚠ You have ${dueTodayCount} task${dueTodayCount > 1 ? "s" : ""} due today`,
        {
          toastId: "dueToday",
          autoClose: 3000,
        }
      );
    }
  }, [dueTodayCount]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Please enter a task title");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await API.put(
          `/tasks/${editTaskId}`,
          {
            title,
            description,
            priority,
            dueDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsEditing(false);
        setEditTaskId(null);
      } else {
        await API.post(
          "/tasks",
          {
            title,
            description,
            priority,
            dueDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");

      toast.success(
        isEditing
          ? "Task Updated Successfully"
          : "Task Added Successfully"
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Operation Failed");
    }
  };

  const confirmDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${taskToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();

      setShowDeleteModal(false);
      setTaskToDelete(null);

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Delete Failed");
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const newStatus =
        task.status === "Completed"
          ? "Pending"
          : "Completed";

      await API.put(
        `/tasks/${task._id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        newStatus === "Completed"
          ? "Task Completed"
          : "Task Marked Pending"
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Update Failed");
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setDueDate(
      task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
    );

    setEditTaskId(task._id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (
      !task.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDueDate = task.dueDate
      ? new Date(task.dueDate)
      : null;

    if (taskDueDate) {
      taskDueDate.setHours(0, 0, 0, 0);
    }

    if (filter === "pending") {
      return task.status.toLowerCase() !== "completed";
    }
    
    if (filter === "completed") {
      return task.status.toLowerCase() === "completed";
    }
    
    if (filter === "overdue") {
      return (
        task.status.toLowerCase() !== "completed" &&
        taskDueDate &&
        taskDueDate < today
      );
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {

    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "dueDate") {
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    return 0;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (
      task.status === "Completed" ||
      !task.dueDate
    ) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriority = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const priorityData = [
    {
      name: "High",
      value: highPriority,
    },
    {
      name: "Medium",
      value: mediumPriority,
    },
    {
      name: "Low",
      value: lowPriority,
    },
  ];

  const chartData = [
    {
      category: "Pending",
      count: pendingTasks,
    },
    {
      category: "Completed",
      count: completedTasks,
    },
    {
      category: "Overdue",
      count: overdueTasks,
    },
  ];

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks / totalTasks) * 100
      );

  return (
    <>
      <div
        className={
          darkMode
            ? "bg-dark text-light min-vh-100"
            : "bg-light text-dark min-vh-100"
        }
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className={"container mt-2 text-center"
        }

        >
          <div className="d-flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Search Tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control border-2"
            />
          
            <select
              className="form-select border-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ maxWidth: "170px" }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          
            <select
              className="form-select border-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ maxWidth: "190px" }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          {dueTodayCount > 0 ? (
            <div className="alert alert-warning py-2 mb-3">
              ⚠ {dueTodayCount} task(s) are due today
            </div>
          ) : (
            <div className="alert alert-success py-2 mb-3">
              🎉 No tasks due today
            </div>
          )}

          <hr />

          <h2>My Tasks</h2>

          <p className="d-flex justify-content-center align-items-center flex-wrap gap-5"><span>Total Tasks: {tasks.length}</span>
            <span>Filtered Tasks: {filteredTasks.length}</span></p>

          {filteredTasks.length === 0 ? (
            <p>No Tasks Found</p>
          ) : (
            sortedTasks.map((task) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const taskDueDate = task.dueDate
                ? new Date(task.dueDate)
                : null;

              if (taskDueDate) {
                taskDueDate.setHours(0, 0, 0, 0);
              }

              return (
                <div
                  key={task._id}
                  className={`card p-3 mb-3 shadow-sm ${task.status === "Completed"
                    ? "bg-info-subtle border-5 border-success"
                    : "bg-secondary-subtle border-danger border-5"
                    }`}
                >
                  <h3 className="fw-bold">

                    {task.status === "Completed" && (
                      <span className="text-success me-2 fs-3">
                        ✓
                      </span>
                    )}

                    {" "}

                    <span
                      className={
                        task.status === "Completed"
                          ? "text-decoration-line-through text-muted"
                          : ""

                      }
                    >
                      {task.title}
                    </span>

                  </h3>

                  <p>Description: {task.description}</p>


                  <p className="d-flex justify-content-center align-items-center flex-wrap gap-5">
                    <span>
                      Status:{" "}
                      <span
                        className={`badge ${task.status === "Completed"
                          ? "bg-success"
                          : task.status === "In Progress"
                            ? "bg-primary"
                            : "bg-secondary"
                          }`}
                      >
                        {task.status}
                      </span>
                    </span>

                    <span>
                      Priority:{" "}
                      <span
                        className={`badge ${task.priority === "High"
                          ? "bg-danger"
                          : task.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-success"
                          }`}
                      >
                        {task.priority}
                      </span>
                    </span>

                    <span>
                      Due Date:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "Not Set"}
                    </span>

                    {task.status !== "Completed" &&
                      taskDueDate &&
                      taskDueDate < today && (
                        <span className="badge bg-danger">
                          Overdue
                        </span>
                      )}
                  </p>

                  {task.status !== "Completed" &&
                    taskDueDate &&
                    taskDueDate.getTime() === today.getTime() && (
                      <p>
                        <span className="badge bg-warning text-dark">
                          Due Today
                        </span>
                      </p>
                    )}

                  <div className="d-flex justify-content-center gap-2 mt-3">

                    <button
                      className={`btn ${task.status === "Completed"
                        ? "btn-secondary"
                        : "btn-success"
                        }`}
                      onClick={() => handleCompleteTask(task)}
                    >
                      {task.status === "Completed"
                        ? "↩ Mark Pending"
                        : "✓ Complete"}
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditTask(task)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setTaskToDelete(task._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      🗑 Delete
                    </button>

                  </div>
                </div>
              );
            })
          )}
          <div className={`card border-2 shadow-sm ${darkMode ? "bg-secondary text-light" : ""
            }`}
          >

            <div className="card-body">

              <h2 className="text-center mb-4">
                Add New Task
              </h2>

              <form onSubmit={handleAddTask}>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                  maxLength={100}
                />
                <small className="text-muted">
                  {title.length}/100 characters
                </small>

                <input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  maxLength={500}
                />
                <small className="text-muted">
                  {description.length}/500 characters
                </small>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <input
                  type="date"
                  className="form-control mt-2"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toLocaleDateString("en-CA")}
                />

                <button
                  type="submit"
                  className={`btn ${isEditing ? "btn-warning" : "btn-primary"
                    }`}
                >
                  {isEditing ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>
          </div>

          <div className="row mb-2">

            <div className="col-md-3 p-2 text-center">
              <div className="card text-bg-primary text-white shadow border-0">
                <div className="card-body">
                  <h5 classname="mb-1">Total Tasks</h5>
                  <h5 classname="mb-0">{totalTasks}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 p-2">
              <div className="card text-bg-warning text-white shadow border-0">
                <div className="card-body">
                  <h5 classname="mb-1">Pending</h5>
                  <h5 classname="mb-0">{pendingTasks}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 p-2">
              <div className="card text-bg-success text-white shadow border-0">
                <div className="card-body">
                  <h5 classname="mb-1">Completed</h5>
                  <h5 classname="mb-0">{completedTasks}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 p-2">
              <div className="card text-bg-danger text-white shadow border-0">
                <div className="card-body">
                  <h5 classname="mb-1">Overdue</h5>
                  <h5 classname="mb-0">{overdueTasks}</h5>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-6">
              <TaskChart data={chartData} />
            </div>

            <div className="col-md-6">
              <PriorityChart data={priorityData} />
            </div>
          </div>

          <div className="card p-2 shadow-sm ">
            <h5 className="mb-1">
              Task Completion Rate
            </h5>

            <div className="progress " style={{ height: "15px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: `${completionPercentage}%`,
                }}
              >
                {completionPercentage}%
              </div>
            </div>

            <p className="mt-1 mb-0">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>




        </div >
      </div>
      <footer
        className={`text-center py-4 ${darkMode
          ? "bg-dark text-light"
          : "bg-light text-muted"
          }`}
      >
        Smart Task Manager © 2026

        <br />

        Built with MERN Stack
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      {
        showDeleteModal && (
          <>
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title">
                      Delete Task
                    </h5>
                    <button
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <p>
                      Are you sure you want to delete this task?
                    </p>
                    <p className="text-danger mb-0">
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={confirmDeleteTask}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="modal-backdrop fade show"></div>
          </>
        )
      }
    </>
  );
}

export default Dashboard;