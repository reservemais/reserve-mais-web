'use strict';

/**
 * ambience service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ambience.ambience');
