import { projectModel } from "../schemas/project";

class Project {
  static create = async ({ newProject }) => {
    const createdNewProject = await projectModel.create(newProject);
    return createdNewProject;
  };

  static findById = async ({ projectId }) => {
    const project = await projectModel.findOne({ id: projectId });
    return project;
  };

  static getTotalList = async ({ userId }) => {
    const projects = await projectModel.find({ userId }).sort({ createdAt: 1 });
    return projects;
  };

  static update = async ({ projectId, toUpdate }) => {
    const filter = { id: projectId };
    const option = { returnOriginal: false };
    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedProject;
  };

  static deleteById = async ({ projectId }) => {
    const deleteResult = await projectModel.deleteOne({
      id: projectId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Project };
