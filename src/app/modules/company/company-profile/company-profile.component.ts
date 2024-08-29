import { SocialLink } from './../../../shared/models/common/SocialIcon';
import { AllCompanyInfoDto } from '../../../shared/models/company/AllCompanyInfoDto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from '../../../shared/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from '../../../shared/models/common/Icon';
import { Industry } from '../../../shared/models/common/Industry';
import { IndustryService } from '../../../shared/services/industry.service';
import { LocationService } from '../../../shared/services/location.service';
import { CountryCode } from '../../../shared/models/common/CountryCode';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Benefit } from '../../../shared/models/company/Benefit';
import { MessageService } from 'primeng/api';
import { NotificationMessageComponent } from '../../../shared/standalone-components/notification-message/notification-message.component';
import { UserDataService } from '../../../shared/services/user-data.service';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss',
})
export class CompanyProfileComponent implements OnInit {
  isLoaded = false;
  @ViewChild('overlay') overlay: any | undefined;
  @ViewChild(NotificationMessageComponent)
  notificationMessageComponent!: NotificationMessageComponent;
  company!: AllCompanyInfoDto;
  isProfileOwner = false;
  benefitsList!: Benefit[];
  industries: Industry[] | undefined;
  icons: any[] | undefined;
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];
  countriesCode: any[] = [];
  imageErrMsg!: string;
  imageErrMsgHeader!: string;
  selectedCountyCode: CountryCode | undefined;
  isViewProfile = false;
  //  social icon
  updatedCompanySocialLinks!: SocialLink[];
  selectedIcon!: any;
  //  benfits icon
  updatedCompanyBenefits!: Benefit[];
  selectedBenefit!: Benefit;

  selectedCoverPhoto!: any;
  selectedProfileImage!: any;
  // error variables
  showMessage = false;
  messageType: string = 'error';
  profileImageError = false;

  basicsInfoEditForm = this.fb.group({
    tagline: [''],
    industry: ['', Validators.required],
    companySize: [''],
    mainBranchLocation: this.fb.group({
      id: [''],
      country: [''],
      city: [''],
      state: [''],
      street: [''],
    }),
  });

  aboutUpdateFrom = this.fb.group({
    about: [''],
    website: [''],
    foundingDate: [''],
  });

  sizeMap: { [key: string]: string } = {
    '1-10 Employees': 'E1to10',
    '11-50 Employees': 'E11to50',
    '51-100 Employees': 'E51to100',
    '101-250 Employees': 'E101to250',
    '251-500 Employees': 'E251to500',
    '501-750 Employees': 'E501to750',
    '751-1k Employees': 'E751to1000',
    '1k-2k Employees': 'E1001to2000',
    '2k-5k Employees': 'E2001to5000',
    '5k-10k Employees': 'E5001to10000',
    'More than 10k Employees': 'Egt10000',
  };

  constructor(
    private companyService: CompanyService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private locationService: LocationService,
    private industryService: IndustryService,
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.loadCountries();
    this.getIndustries();
  }

  ngOnInit(): void {
    let comapnyId = this.route.snapshot.params['id'];
    let userId = this.tokenService.getUserId();
    // this.checkIsProfileOwner(comapnyId);
    if (comapnyId && comapnyId != userId) {
      this.getCompnayData(comapnyId);
    } else {
      this.getCompnayData(userId);
      this.isViewProfile = true;
      this.isProfileOwner = true;
    }
  }

  get country() {
    return this.basicsInfoEditForm.controls.mainBranchLocation.controls.country
      .value;
  }
  get locationId() {
    return this.basicsInfoEditForm.controls.mainBranchLocation.controls.id
      .value;
  }
  get city() {
    return this.basicsInfoEditForm.controls.mainBranchLocation.controls.city
      .value;
  }
  get state() {
    return this.basicsInfoEditForm.controls.mainBranchLocation.controls.state
      .value;
  }

  loadStates() {
    // let countryIso2: string = this.country as string;
    let countryIso2: string = this.locationService.getLocationIso(
      this.country as string,
      this.countries
    );
    this.locationService.loadStates(countryIso2).subscribe({
      next: (states) => {
        this.states = states;
        if (this.city) this.loadCities();
      },
      error: (err) => console.error('Error in Getting States', err),
    });
  }

  loadCountries() {
    this.locationService.loadCountries().subscribe({
      next: (res) => {
        this.countries = res;
        if (this.state) this.loadStates();
      },
      error: (err) => console.error('Error in Getting Countries'),
    });
  }

  loadCities() {
    let countryIso2: string = this.locationService.getLocationIso(
      this.country as string,
      this.countries
    );
    let stateIso2: string = this.locationService.getLocationIso(
      this.state as string,
      this.states
    );

    this.locationService.loadCities(countryIso2, stateIso2).subscribe({
      next: (cities: any) => (this.cities = cities),
      error: (err) => console.error('Error in Getting Cities'),
    });
  }

  getFirstFormInput(formElment: string): AbstractControl | null {
    return this.basicsInfoEditForm.get(formElment);
  }

  show(el: any) {
    el.classList.remove('hide');
    this.overlay.nativeElement.classList.remove('hide');
  }

  showCover(el: any) {
    el.classList.remove('hide');
  }

  hide(el: any) {
    el.classList.add('hide');
    this.overlay.nativeElement.classList.add('hide');
  }

  cencel(el: any, imageContainer: any) {
    this.hide(el);
    if (imageContainer.src && this.company.basicInfoDto.imageUrl) {
      imageContainer.src = this.company.basicInfoDto.imageUrl;
    } else if (imageContainer.src) {
      imageContainer.src = '../../../assets/imgs/company/user (1).svg';
    } else {
      imageContainer.style.backgroundImage = 'none';
    }
    this.profileImageError = false;
  }

  getCompnayData(companyId: any) {
    this.companyService.getAllCompanyData(companyId).subscribe(
      (res) => {
        if (res.ok) {
          this.company = res.body;
          console.log(this.company);
          setTimeout(() => {
            this.isLoaded = true;
          }, 400);
        }
      },
      (err) => {
        console.log(err);
        // this.router.navigate(['/404'])
      }
    );
  }

  getIndustries() {
    this.companyService.getIndustries().subscribe(
      (res) => {
        if (res.ok) {
          this.industries = res.body;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBenefits() {
    this.companyService.getBenefits().subscribe(
      (res) => {
        if (res) {
          this.benefitsList = [...res];
          console.log(this.benefitsList);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSocialIconsInfo() {
    this.companyService.getSocialIcons().subscribe(
      (res) => {
        if (res) {
          this.icons = res;
          console.log(this.icons);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editBasicsInfo(basics: any) {
    basics.classList.remove('hide');
    this.overlay.nativeElement.classList.remove('hide');
    this.setValueInBasicsInfoFrom();
  }

  setValueInBasicsInfoFrom() {
    console.log(this.company.basicInfoDto.companySize);
    let size = this.sizeMap[this.company.basicInfoDto.companySize];
    console.log(size);
    this.basicsInfoEditForm.patchValue({
      tagline: this.company.basicInfoDto.tagline,
      industry: this.company.basicInfoDto.industry,
      companySize: size,
      mainBranchLocation: {
        id: this.company.basicInfoDto.mainBranchLocation.id,
        country: this.company.basicInfoDto.mainBranchLocation.country,
        city: this.company.basicInfoDto.mainBranchLocation.city,
        state: this.company.basicInfoDto.mainBranchLocation.state,
        street: this.company.basicInfoDto.mainBranchLocation.street,
      },
    });
  }

  setValueInAboutInfoFrom() {
    console.log(this.company.aboutInfoDto.foundingDate);
    this.aboutUpdateFrom.patchValue({
      about: this.company.aboutInfoDto.about,
      website: this.company.aboutInfoDto.website,
      foundingDate: this.company.aboutInfoDto.foundingDate?.split('T')[0],
    });
  }

  updateBasicsInfo(el: any) {
    if (this.basicsInfoEditForm.valid) {
      console.log('Valid ');
      this.companyService
        .updateBasicsInfo(this.basicsInfoEditForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.company.basicInfoDto = res.body;
            this.hide(el);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      console.log(this.basicsInfoEditForm.errors);
    }
  }

  editAboutInfo(aboutInfo: any) {
    this.updatedCompanySocialLinks = this.company.aboutInfoDto.socialLinks;
    this.getSocialIconsInfo();
    this.setValueInAboutInfoFrom();
    this.show(aboutInfo);
  }

  addItem(el: any) {
    const link = el.querySelector('input').value;
    if (link == '') {
      el.querySelector('input').classList.add('error');
      el.querySelector('.link-error-message').classList.remove('hide');
      return;
    }
    const socialLink = {
      icon: this.selectedIcon,
      link: link,
    } as SocialLink;
    this.updatedCompanySocialLinks = this.updatedCompanySocialLinks.filter(
      (el) => el.icon.id != socialLink.icon.id
    );
    this.updatedCompanySocialLinks?.push(socialLink);
    el.querySelector('input').value = '';
  }

  deleteIcon(icon: any) {
    this.updatedCompanySocialLinks = this.updatedCompanySocialLinks.filter(
      (el) => el.icon.id != icon.icon.id
    );
  }

  editBenefits(about: any) {
    this.updatedCompanyBenefits = [
      ...this.company.aboutInfoDto.companyBenefits,
    ];
    this.getBenefits();
    about.classList.remove('hide');
    this.overlay.nativeElement.classList.remove('hide');
  }

  addBenefit() {
    this.updatedCompanyBenefits = this.updatedCompanyBenefits.filter(
      (el) => el.id != this.selectedBenefit.id
    );
    this.updatedCompanyBenefits.push(this.selectedBenefit);
  }

  deleteBenefit(benefit: any) {
    this.updatedCompanyBenefits = this.updatedCompanyBenefits.filter(
      (el) => el.id != benefit.id
    );
  }

  updateBenefits(benfitsPanle: any) {
    console.log(JSON.stringify(this.updatedCompanyBenefits));
    this.companyService.updateBenefits(this.updatedCompanyBenefits).subscribe(
      (res) => {
        if (res.ok) {
          console.log(res.body);
          this.company.aboutInfoDto.companyBenefits = res.body;
          this.hide(benfitsPanle);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAboutInfo(about: any) {
    if (this.aboutUpdateFrom.valid) {
      console.log(this.updatedCompanySocialLinks);
      const updatedValue = {
        about: this.aboutUpdateFrom.controls.about.value,
        website: this.aboutUpdateFrom.controls.website.value,
        foundingDate: this.aboutUpdateFrom.controls.foundingDate.value,
        socialLinks: this.updatedCompanySocialLinks,
      };
      this.companyService.updateAboutInfo(updatedValue).subscribe(
        (res) => {
          if (res.ok) {
            console.log(res);
            this.company.aboutInfoDto = res.body;
            this.hide(about);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  // photos
  onCoverSelected(event: any, coverImage: any) {
    const file: File = <File>event.target.files[0];
    if (file && file.size < 1024 * 1024) {
      this.selectedCoverPhoto = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        coverImage.style.backgroundImage = `url(${e.target.result})`;
      };
      this.uploadCoverImage();
      reader.readAsDataURL(file);
    } else {
      this.showMessageCard(
        'error',
        'Error',
        'File size exceeds limit, Max size for image 2MB'
      );
    }
  }

  onProfileImageSelected(event: any, profileImage: any) {
    const file: File = <File>event.target.files[0];
    if (file && file.size < 1024 * 1024) {
      console.log('Selected done ');
      this.selectedProfileImage = file;
      this.profileImageError = false;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.profileImageError = true;
      this.imageErrMsg = 'File size exceeds limit, Max size for image 2MB';
    }
  }

  uploadCoverImage() {
    if (this.selectedCoverPhoto) {
      const coverImageFrom = new FormData();
      coverImageFrom.append(
        'photo',
        this.selectedCoverPhoto,
        this.selectedCoverPhoto.name
      );
      this.companyService.uploadCoverImage(coverImageFrom).subscribe(
        (response) => {
          if (response.ok) {
            this.company.basicInfoDto.coverImage = response.body;
            this.showMessageCard(
              'success',
              'Success',
              'Image uploaded successfully!'
            );
          }
        },
        (error) => {
          this.showMessageCard('error', 'Uploading Feild', error);
        }
      );
    }
  }

  uploadProfileImage(el: any) {
    if (this.selectedProfileImage) {
      const coverImageFrom = new FormData();
      coverImageFrom.append(
        'photo',
        this.selectedProfileImage,
        this.selectedProfileImage.name
      );
      this.companyService.uploadProfileImage(coverImageFrom).subscribe(
        (response) => {
          if (response.ok) {
            this.company.basicInfoDto.profileImage = response.body;
            this.hide(el);
            this.profileImageError = false;
            this.showMessageCard(
              'success',
              'Success',
              'Image uploaded successfully!'
            );
          }
        },
        (error) => {
          this.showMessageCard('error', 'Uploading Feild', error);
        }
      );
    }
  }

  showMessageCard(type: string, header: string, massage: string) {
    this.messageType = type;
    this.imageErrMsgHeader = header;
    this.imageErrMsg = massage;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 10000);
  }
  /*
  checkIsProfileOwner(profileId: string) {
    if (!profileId) return;
    this.userDataService.checkIsProfileOwner(profileId).subscribe({
      next: (res) => {
        this.isProfileOwner = res.body;
      },
      error(err) {
        console.log('error in checking  is owner', err);
      },
    });
  }
*/
}
