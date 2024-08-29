import { LanguageData } from './../../../../../shared/models/job-seeker/complete-profile/language-data';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RetrieveJobSeekerDataService } from '../../../retrieve-job-seeker-data.service';
import { CompleteProfileService } from '../../complete-profile.service';
import { ApiResponse } from '../../../../../shared/models/Api-response';

@Component({
  selector: 'app-job-seeker-language-form',
  templateUrl: './job-seeker-language-form.component.html',
  styleUrl: './job-seeker-language-form.component.scss',
})
export class JobSeekerLanguageFormComponent implements OnInit {
  jobSeekerProfileService = inject(CompleteProfileService);
  retrieveJobSeekerData = inject(RetrieveJobSeekerDataService);
  formBuilder = inject(FormBuilder);
  editItemId: string = '';
  isSaveChangesVisible: boolean = false;
  isLanguageExist: boolean = false;
  ngOnInit(): void {
    this.getLanguages();
    this.loadLanguages();
  }
  selectedLanguages: Array<LanguageData> | undefined;
  allLanguages: Array<{ id: string; value: string }> = [];
  languagesLevels: Array<{ name: string }> = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' },
    { name: 'Fluent' },
  ];
  // Languages Form
  languagesForm = this.formBuilder.group({
    language: ['', Validators.required],
    level: ['', Validators.required],
  });

  get languageValue() {
    return this.languagesForm.value?.language as string;
  }
  get languageLevelValue() {
    return this.languagesForm.value?.level as string;
  }

  saveLanguage(language: LanguageData) {
    this.jobSeekerProfileService.saveLanguage(language).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.ok) {
          console.log(res);
          console.log(this.languageValue, 'Saved');
          this.removeLangugeFromLanguagesList(res.body);
          this.selectedLanguages?.push(res.body);
          this.languagesForm.reset();
        }
      },
      error: (err) => console.log('error on saving ', this.languageValue, err),
    });
  }

  getLanguages() {
    this.retrieveJobSeekerData.getLanguages().subscribe({
      next: (res: ApiResponse<any>) => {
        console.log(res);
        this.selectedLanguages = res.body;
      },
      error: () => {
        console.log('Error in getting languages');
      },
    });
  }

  loadLanguages() {
    this.retrieveJobSeekerData.getLanguageNames().subscribe({
      next: (res) => {
        this.allLanguages = res.sort((a: any, b: any) =>
          a.value.localeCompare(b.value)
        );
      },
    });
  }

  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  clearForm() {
    this.languagesForm.reset();
  }

  scrollToEditForm(element: LanguageData) {
    if (!element.id) return;
    this.editItemId = element.id;
    this.languagesForm.patchValue({
      language: element.languageName,
      level: element.languageLevel,
    });
    this.isSaveChangesVisible = true;

    this.scrollToElementById('education-form-start');
  }

  deletelanguage(lang: LanguageData) {
    // if (!lang.id) return;
    this.jobSeekerProfileService.deleteLanguage(lang).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.ok) {
          this.removeLangugeFromLanguagesList(lang);
          console.log('Language deleted', res);
        }
      },
      error: (err) => console.log('Error in deleting Language', err),
    });
  }

  validateLanguage() {
    console.log('Validation', this.selectedLanguages);
    const currentLanguage: LanguageData = {
      languageName: this.languageValue,
      languageLevel: this.languageLevelValue,
    };
    const languageExists = this.checkIsLanguageExist();

    if (!this.isLanguageExist) {
      this.saveLanguage(currentLanguage);
    } else {
      if (languageExists!.languageLevel !== currentLanguage.languageLevel) {
        languageExists!.languageLevel = currentLanguage.languageLevel;
        this.saveLanguage(languageExists as LanguageData);
      }
    }
  }

  removeLangugeFromLanguagesList(language: LanguageData) {
    this.selectedLanguages = this.selectedLanguages?.filter(
      (item) => item.languageName != language.languageName
    );
  }

  checkIsLanguageExist(): LanguageData | null {
    const ExistingLanguage = this.selectedLanguages?.find(
      (lang) => lang.languageName === this.languageValue
    );
    if (
      ExistingLanguage &&
      ExistingLanguage.languageLevel == this.languageLevelValue
    ) {
      this.isLanguageExist = true;
      return ExistingLanguage;
    }
    this.isLanguageExist = false;
    return null;
  }
}
