const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate({ params }) {
    const ambience = await strapi.db.query("api::ambience.ambience").findOne({
      select: "availability",
      where: {
        id: params.data.ambience.id,
      },
    });

    if (ambience.availability !== "available") {
      throw new ApplicationError(
        "A sala selecionada não está disponível. Por favor tente outra!"
      );
    }

    const reservations = await strapi.db
      .query("api::reservation.reservation")
      .findMany({
        populate: { ambience: true },
        where: {
          ambience: {
            id: params.data.ambience.id,
          },
        },
      });

    const isConflict = reservations.some((r) => {
      return (
        r.ambience.id === params.data.ambience.id &&
        r.id !== params.data.id &&
        ((params.data.start >= r.start && params.data.start < r.end) ||
          (params.data.start <= r.start && params.data.end > r.end) ||
          (params.data.end > r.start && params.data.end <= r.end))
      );
    });

    if (isConflict) {
      throw new ApplicationError(
        "Sala não está disponível no horário solicitado"
      );
    }
  },

  async beforeUpdate({ params }) {
    const ambience = await strapi.db.query("api::ambience.ambience").findOne({
      select: "availability",
      where: {
        id: params.data.ambience.id,
      },
    });

    if (ambience.availability !== "available") {
      throw new ApplicationError(
        "A sala selecionada não está disponível. Por favor tente outra!"
      );
    }

    const reservations = await strapi.db
      .query("api::reservation.reservation")
      .findMany({
        populate: { ambience: true },
        where: {
          ambience: {
            id: params.data.ambience.id,
          },
        },
      });

    const isConflict = reservations.some((r) => {
      return (
        r.ambience.id === params.data.ambience.id &&
        r.id !== params.data.id &&
        ((params.data.start >= r.start && params.data.start < r.end) ||
          (params.data.start <= r.start && params.data.end > r.end) ||
          (params.data.end > r.start && params.data.end <= r.end))
      );
    });

    if (isConflict) {
      throw new ApplicationError(
        "Sala não está disponível no horário solicitado"
      );
    }
  },
};
