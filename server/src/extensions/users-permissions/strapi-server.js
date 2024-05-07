const {
  getPaginationInfo,
  transformPaginationResponse,
  convertPagedToStartLimit,
} = require("@strapi/strapi/lib/core-api/service/pagination");
const utils = require("@strapi/utils");
const { sanitize } = utils;

const sanitizeQuery = async (query, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user");
  const { auth } = ctx.state;

  return sanitize.contentAPI.query(query, schema, { auth });
};

const sanitizeOutput = async (user, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user");
  const { auth } = ctx.state;

  return sanitize.contentAPI.output(user, schema, { auth });
};

module.exports = (plugin) => {
  plugin.controllers.user.find = async (ctx) => {
    const uid = "plugin::users-permissions.user";
    const sanitizedQuery = await sanitizeQuery(ctx.query, ctx);
    const { pagination = {}, ...restOfCtxQueries } = sanitizedQuery;
    const queryPagination = convertPagedToStartLimit(pagination);
    const params = { ...restOfCtxQueries, ...queryPagination };
    const query = utils.convertQueryParams.transformParamsToQuery(uid, params);

    const [users, count] = await strapi.db.query(uid).findWithCount(query);

    const paginationInfo = getPaginationInfo(sanitizedQuery);
    const paginationResult = transformPaginationResponse(paginationInfo, count);

    let data = await Promise.all(
      users.map((user) => sanitizeOutput(user, ctx))
    );

    ctx.body = {
      data: data,
      meta: {
        pagination: paginationResult,
      },
    };
  };

  return plugin;
};
