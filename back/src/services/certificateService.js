import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static addCertificate = async ({ newCertificate }) => {
    const id = uuidv4();
    newCertificate.id = id;

    const createNewCertificateResult = await Certificate.create({
      newCertificate,
    });

    createNewCertificateResult.errorMessage = null;

    return createNewCertificateResult;
  };

  static getCertificateList = async ({ userId }) => {
    const getCertificatesResult = await Certificate.findAllToUser({ userId });

    if (!getCertificatesResult) {
      const errorMessage = "자격증 목록을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getCertificatesResult;
  };

  static getCertificate = async ({ certificateId }) => {
    const getCertificateResult = await Certificate.findOne({
      id: certificateId,
    });

    if (!getCertificateResult) {
      const errorMessage = "자격증을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getCertificateResult;
  };

  static deleteCertificate = async ({ certificateId }) => {
    const deleteCertificateResult = await Certificate.delete({
      id: certificateId,
    });

    if (!deleteCertificateResult) {
      const errorMessage = "자격증 삭제에 실패했습니다.";
      return { errorMessage };
    }

    return deleteCertificateResult;
  };

  static updateCertificate = async ({ certificateId, toUpdate }) => {
    const updateCertificateResult = await Certificate.update({
      certificateId,
      toUpdate,
    });

    if (!updateCertificateResult) {
      const errorMessage = "자격증을 수정하는 데 실패했습니다.";
      return { errorMessage };
    }

    return updateCertificateResult;
  };
}

export { certificateService };
