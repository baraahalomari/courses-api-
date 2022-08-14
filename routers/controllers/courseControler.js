const { Courses, Users } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const addCourse = async (req, res) => {
  try {
    const { subject, desc, date, instractor } = req.body;
    const course = await Courses.create({
      subject,
      course_id: uuidv4(),
      date,
      desc,
      instractor,
    });
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const course = await Courses.findOne({where : {course_id: req.params.id, record_status: "latest"}});
    const students = await Users.findAll({
      where: {courses_id: course.course_id}
    })
    
    res.status(200).json({...course.dataValues,students});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getByPage = async (req, res) => {
  try {
    let { page } = req.params;
    if (!Number(page)) page = 1;
    const offset = (Number(page) - 1) * 3;
    const result = await Courses.findAndCountAll({
      offset: offset,
      limit: 3,
      sort: "createdAt",
      where: {
        record_status: "latest",
      },
    });

    const response = [];

    for (let i = 0; i < result.rows.length; i++) {
      const students = await Users.findAll({
        where: {
          courses_id: result.rows[i].course_id,
        },
      });
      response.push({ ...result.rows[i].dataValues, students });
    }

    res.status(200).json({ count: result.count, rows: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Courses.findAll({
      where: {
        record_status: "latest",
      },
    });
    const response = [];

    for (let i = 0; i < courses.length; i++) {
      const students = await Users.findAll({
        where: {
          courses_id: courses[i].course_id,
        },
      });
      response.push({ ...courses[i].dataValues, students });
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { subject, desc, date, instractor } = req.body;
    await Courses.update(
      {
        record_status: "updated",
      },
      {
        where: {
          course_id,
          record_status: "latest",
        },
      }
    );
    const course = await Courses.create({
      subject,
      course_id,
      date,
      desc,
      instractor
    });
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    await Courses.update(
      {
        record_status: "deleted",
      },
      {
        where: {
          course_id,
          record_status: "latest",
        },
      }
    );
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const joinCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { user } = req.body;
    const createdUser = await Users.create({
      user_id: user.user_id,
      courses_id: course_id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
    res.status(200).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const leaveCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { user_id } = req.body;

    await Users.destroy({
      where: { courses_id: course_id, user_id },
    });
    res.status(200).json({ message: "Student leave Course" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  joinCourse,
  leaveCourse,
  getByPage,
  getById
};
