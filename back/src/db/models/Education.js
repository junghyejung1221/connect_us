import { educationModel } from "../schemas/education";

class Education {
  static create = async ({ newEducation }) => {
    const createdNewEducation = await educationModel.create(newEducation);
    return createdNewEducation;
  };

  static findById = async ({ educationId }) => {
    const education = await educationModel.findOne({ id: educationId });
    return education;
  };

  static findByUserId = async ({ userId }) => {
    const educations = await educationModel.find({ userId });
    return educations;
  };

  static update = async ({ educationId, toUpdate }) => {
    const filter = { id: educationId };
    const option = { returnOriginal: false };
    const updatedEducation = await educationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  };

  static deleteById = async ({ educationId }) => {
    const deleteResult = await educationModel.deleteOne({ id: educationId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Education };
