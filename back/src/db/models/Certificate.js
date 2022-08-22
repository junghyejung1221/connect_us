import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static create = async ({ newCertificate }) => {
    const checkAlreadyExist = await CertificateModel.findOne({
      userId: newCertificate.userId,
      title: newCertificate.title,
    });
    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  };

  static delete = async ({ id }) => {
    const deleteCertificateResult = await CertificateModel.deleteOne({ id });
    return deleteCertificateResult;
  };

  static findAllToUser = async ({ userId }) => {
    const certificates = await CertificateModel.find({
      userId,
    });

    return certificates;
  };

  static findOne = async ({ id }) => {
    const certificate = await CertificateModel.findOne({
      id,
    });
    return certificate;
  };

  static update = async ({ certificateId, toUpdate }) => {
    const filter = {
      id: certificateId,
    };
    const option = { returnOriginal: false };

    const updateCertificateResult = await CertificateModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    return updateCertificateResult;
  };
}

export { Certificate };
