const { Courses, Users ,Reviews } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const addReviews = async (req,res) => {
  try {
    const {user_id,course_id,comment,username} = req.body;
    const reviews = await Reviews.create({
      user_id,
      course_id,
      comment,
      username,
      review_id: uuidv4()
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
}

const updateReviews = async (req, res) => {
  try {
    const { review_id } = req.params;
    const { comment } = req.body;
    const oldReview = await Reviews.findOne({
      where: {
        review_id,
        record_status: "latest",
      },
    });

    await Reviews.update(
      {
        record_status: "updated",
      },
      {
        where: {
          review_id,
          record_status: "latest",
        },
      }
    );
    const reviews = await Reviews.create({
      user_id: oldReview.user_id,
      course_id: oldReview.course_id,
      username: oldReview.username,
      createdAt : oldReview.createdAt,
      comment,
      review_id,
    });
    res.status(200).json(reviews);

  }catch(error){
    console.log(error);
  }
}  

const deleteReviews = async (req, res) => {
  try {
    const { review_id } = req.params;
    await Reviews.update(
      {
        record_status: "deleted",
      },
      {
        where: {
          review_id,
          record_status: "latest",
        },
      }
    );
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const getReviews = async (req, res) => {
  try {
    const { course_id } = req.params;
    const reviews = await Reviews.findAll({
      where: {
        course_id,
        record_status: "latest",
      },
      order : [
        ['createdAt','DESC']
      ]
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  addReviews,
  updateReviews,
  deleteReviews,
  getReviews,
}