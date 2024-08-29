"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var job_seeker_loader_component_1 = require("./modules/job-seeker/job-seeker-loader/job-seeker-loader.component");
var job_posts_component_1 = require("./modules/company/job-posts/job-posts/job-posts.component");
var company_profile_component_1 = require("./modules/company/company-profile/company-profile.component");
var job_details_component_1 = require("./modules/company/job-posts/job-details/job-details.component");
var job_application_component_1 = require("./modules/job-seeker/job-application/job-application.component");
var saved_jobs_component_1 = require("./modules/job-seeker/saved-jobs/saved-jobs.component");
var job_seeker_profile_component_1 = require("./modules/job-seeker/job-seeker-profile/job-seeker-profile.component");
var appt_page_component_1 = require("./modules/appt-page/appt-page.component");
var profile_component_1 = require("./modules/appt-page/components/profile/profile.component");
var comments_component_1 = require("./modules/appt-page/components/comments/comments.component");
var timeline_component_1 = require("./modules/appt-page/components/timeline/timeline.component");
var offer_component_1 = require("./modules/appt-page/components/offer/offer.component");
var interview_component_1 = require("./modules/appt-page/components/interview/interview.component");
var initial_search_page_component_1 = require("./modules/search-pages/initial-search-page/initial-search-page.component");
var jobs_filter_search_page_component_1 = require("./modules/search-pages/jobs-filter-search-page/jobs-filter-search-page.component");
var companies_filter_search_page_component_1 = require("./modules/search-pages/companies-filter-search-page/companies-filter-search-page.component");
var people_filter_search_page_component_1 = require("./modules/search-pages/people-filter-search-page/people-filter-search-page.component");
var company_header_component_1 = require("./modules/company/company-header/company-header.component");
var main_app_component_1 = require("./modules/main-app/main-app.component");
var job_post_app_form_resolver_1 = require("./modules/job-seeker/resolvers/job-post-app-form.resolver");
var jobseeker_hiring_process_component_1 = require("./modules/jobseeker-hiring-process/jobseeker-hiring-process.component");
var question_component_1 = require("./modules/jobseeker-hiring-process/components/question/question.component");
var second_page_component_1 = require("./modules/jobseeker-hiring-process/components/jobseeker-interview/second-page/second-page.component");
var childRouts = [
    {
        // Lazy Loading Home Module if the path is empty
        path: '',
        pathMatch: 'full',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/home-module/home.module'); }).then(function (m) { return m.HomeModule; });
        }
    },
    {
        // Lazy Loading Home Module
        path: 'home',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/home-module/home.module'); }).then(function (m) { return m.HomeModule; });
        }
    },
    // Lazy Loading Job Auth Module
    {
        path: 'auth',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/auth-module/auth.module'); }).then(function (m) { return m.AuthModuleModule; });
        }
    },
    // Lazy Loading Job Seeker Module
    {
        path: 'job-seeker',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/job-seeker/job-seeker.module'); }).then(function (m) { return m.JobSeekerModule; });
        }
    },
    {
        path: 'job-seeker-loader',
        component: job_seeker_loader_component_1.JobSeekerLoaderComponent
    },
    {
        path: 'job-details/:id',
        component: job_details_component_1.JobDetailsComponent
    },
    {
        path: 'job-application/:postId',
        component: job_application_component_1.JobApplicationComponent,
        resolve: {
            jobPostAppFormResolver: job_post_app_form_resolver_1.jobPostAppFormResolver
        }
    },
    {
        path: 'company-profile',
        component: company_profile_component_1.CompanyProfileComponent
    },
    {
        path: 'js-profile',
        component: job_seeker_profile_component_1.JobSeekerProfileComponent
    },
    {
        path: 'app-page/:postId',
        component: appt_page_component_1.ApptPageComponent
    },
    {
        path: 'app-profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'app-interview',
        component: interview_component_1.InterviewComponent
    },
    {
        path: 'app-comments',
        component: comments_component_1.CommentsComponent
    },
    {
        path: 'app-timelines',
        component: timeline_component_1.TimelineComponent
    },
    {
        path: 'app-offer',
        component: offer_component_1.OfferComponent
    },
    {
        path: 'saved-job',
        component: saved_jobs_component_1.SavedJobsComponent
    },
    {
        path: 'company',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/company/company.module'); }).then(function (m) { return m.CompanyModule; });
        }
    },
    {
        path: 'initial',
        component: initial_search_page_component_1.InitialSearchPageComponent
    },
    {
        path: 'jobs-search',
        component: jobs_filter_search_page_component_1.JobsFilterSearchPageComponent
    },
    {
        path: 'company-search',
        component: companies_filter_search_page_component_1.CompaniesFilterSearchPageComponent
    },
    {
        path: 'people-search',
        component: people_filter_search_page_component_1.PeopleFilterSearchPageComponent
    },
    {
        path: 'job-posts',
        component: job_posts_component_1.JobPostsComponent
    },
    {
        path: 'hiring-process',
        component: jobseeker_hiring_process_component_1.JobseekerHiringProcessComponent
    },
    {
        path: 'question',
        component: question_component_1.QuestionComponent
    },
    {
        path: 'js-intfirst',
        component: second_page_component_1.SecondPageComponent
    },
];
var routes = [
    {
        path: '',
        component: main_app_component_1.MainAppComponent,
        children: childRouts
    },
    // Lazy loading Error pages
    {
        path: 'error/:err',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./shared/standalone-components/error-page/error-page.component'); }).then(function (c) { return c.ErrorPageComponent; });
        }
    },
    {
        path: 'comp-nav',
        component: company_header_component_1.CompanyHeaderComponent
    },
    {
        path: '**',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./shared/standalone-components/error-page/error-page.component'); }).then(function (c) { return c.ErrorPageComponent; });
        }
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
