const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate({ params }) {
    const { initialDayOfSemester, lastDayOfSemester, currentSemester } =
      params.data;

    const initialDate = new Date(initialDayOfSemester);
    const lastDate = new Date(lastDayOfSemester);

    if (lastDate <= initialDate) {
      throw new ApplicationError("A data final deve ser maior que a inicial");
    }

    if (currentSemester) {
      await strapi.db.query("api::semester.semester").update({
        where: { currentSemester: true },
        data: { currentSemester: false },
      });
    }
  },

  async beforeUpdate({ params }) {
    const { initialDayOfSemester, lastDayOfSemester, currentSemester } =
      params.data;

    const initialDate = new Date(initialDayOfSemester);
    const lastDate = new Date(lastDayOfSemester);

    if (lastDate <= initialDate) {
      throw new ApplicationError("A data final deve ser maior que a inicial");
    }

    if (currentSemester) {
      await strapi.db.query("api::semester.semester").update({
        where: { currentSemester: true },
        data: { currentSemester: false },
      });
    }
  },
};
