const coursesRouter = require("express").Router();
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  joinCourse,
  leaveCourse,
  getByPage,
  getById
} = require("../controllers/courseControler");

coursesRouter.post("/", addCourse);
coursesRouter.get("/", getCourses);
coursesRouter.put("/:course_id", updateCourse);
coursesRouter.delete("/:course_id", deleteCourse);
coursesRouter.post("/:course_id/join", joinCourse);
coursesRouter.delete("/:course_id/leave", leaveCourse);
coursesRouter.get("/:page/page", getByPage);
coursesRouter.get("/:id", getById);

module.exports = coursesRouter;
