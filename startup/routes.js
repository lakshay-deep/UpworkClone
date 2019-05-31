const express = require('express');
const business_streams = require('../routes/business_streams');
const company_images = require('../routes/company_images');
const companys = require('../routes/companys');
const education_details = require('../routes/education_details');
const experience_details = require('../routes/experience_details');
const job_locations = require('../routes/job_locations');
const job_post_skill_sets = require('../routes/job_post_skill_sets');
const job_posts_activity = require('../routes/job_posts_activity');
const job_posts = require('../routes/job_posts');
const job_types = require('../routes/job_types');
const seeker_profiles = require('../routes/seeker_profiles');
const seeker_skill_sets = require('../routes/seeker_skill_sets');
const skill_sets = require('../routes/skill_sets');
const user_accounts = require('../routes/user_accounts');
const user_logs = require('../routes/user_logs');
const user_types = require('../routes/user_types');


module.exports = function(app) {
    
  app.use(express.json());
  app.use('/api/business_streams', business_streams);
  app.use('/api/company_images', company_images);
  app.use('/api/companys', companys);
  app.use('/api/education_details', education_details);
  app.use('/api/experience_details', experience_details);
  app.use('/api/job_locations', job_locations);
  app.use('/api/job_post_skill_sets', job_post_skill_sets);
  app.use('/api/job_posts_activity', job_posts_activity);
  app.use('/api/job_posts', job_posts);
  app.use('/api/job_types', job_types);
  app.use('/api/seeker_profiles', seeker_profiles);
  app.use('/api/seeker_skill_sets', seeker_skill_sets);
  app.use('/api/skill_sets', skill_sets);
  app.use('/api/user_accounts', user_accounts);
  app.use('/api/user_logs', user_logs);
  app.use('/api/user_types', user_types);
}