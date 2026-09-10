-- CreateIndex
CREATE INDEX "blog_posts_authorId_idx" ON "blog_posts"("authorId");

-- CreateIndex
CREATE INDEX "blog_posts_categoryId_idx" ON "blog_posts"("categoryId");

-- CreateIndex
CREATE INDEX "job_benefits_jobId_idx" ON "job_benefits"("jobId");

-- CreateIndex
CREATE INDEX "job_requirements_and_tasks_jobId_idx" ON "job_requirements_and_tasks"("jobId");

-- CreateIndex
CREATE INDEX "jobs_departmentId_idx" ON "jobs"("departmentId");

-- CreateIndex
CREATE INDEX "post_tags_tagId_idx" ON "post_tags"("tagId");

-- CreateIndex
CREATE INDEX "project_services_serviceId_idx" ON "project_services"("serviceId");

-- CreateIndex
CREATE INDEX "project_technologies_technologyId_idx" ON "project_technologies"("technologyId");

-- CreateIndex
CREATE INDEX "service_technologies_technologyId_idx" ON "service_technologies"("technologyId");
