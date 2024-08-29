"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardPageComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var public_pipes_shared_module_module_1 = require("../../../shared/pipes/public-pipes/public-pipes-shared-module.module");
var get_date_pipe_module_1 = require("../../../shared/pipes/public-pipes/get-date-pipe/get-date-pipe.module");
var token_service_1 = require("../../../shared/services/token.service");
var DashboardPageComponent = /** @class */ (function () {
    function DashboardPageComponent() {
        this.route = core_1.inject(router_1.ActivatedRoute);
        this.tokenService = core_1.inject(token_service_1.TokenService);
    }
    DashboardPageComponent.prototype.ngOnInit = function () {
        this.checkIsUserRecruiter();
        console.log(this.isCompany);
        if (this.isCompany) {
            this.companyStatistics = this.route.snapshot.data['companyStatistics'].body;
            console.log(this.companyStatistics);
        }
        else {
            this.recruiterStatistics = this.route.snapshot.data['recruiterStatistics'].body;
            console.log(this.recruiterStatistics);
        }
        this.companyJobPosts =
            this.route.snapshot.data['companyRecentPosts'].body.content;
        console.log('job Posts ', this.companyJobPosts);
    };
    DashboardPageComponent.prototype.checkIsUserRecruiter = function () {
        this.isCompany = this.tokenService.getUserRoles().includes('ROLE_COMPANY');
    };
    DashboardPageComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard-page',
            templateUrl: './dashboard-page.component.html',
            styleUrl: './dashboard-page.component.scss',
            standalone: true,
            imports: [common_1.CommonModule, get_date_pipe_module_1.GetDatePipeModule, public_pipes_shared_module_module_1.PublicPipesSharedModuleModule, router_1.RouterModule]
        })
    ], DashboardPageComponent);
    return DashboardPageComponent;
}());
exports.DashboardPageComponent = DashboardPageComponent;
