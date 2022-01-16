import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ConvertNumberToFileType, FileType } from 'src/app/consts/enums';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { BaseResponse, PageInfo } from 'src/app/models/base-model';
import { ExerciseInfo } from 'src/app/models/exercise/exercise-info';
import { ToastService } from 'src/app/services/common/toastr-service';
import { ExerciseService } from 'src/app/services/exercise/exercise-service';

@Component({
  templateUrl: './exercise-management.page.html',
  providers: [ExerciseService]
})
export class ExerciseManagementPage implements AfterViewInit {
  //Publics
  public exercises: Array<ExerciseInfo>
  public showStatusAddExerciseModal: boolean = false;
  public forEditExercise: ExerciseInfo | undefined;
  public get totalExerciseCount(): number {
    return this.exercises?.filter(i => i.Exercise.IsActive).length ?? 0;
  };
  public pageInfo: PageInfo = new PageInfo(1, 10);
  public fileType = FileType;
  // View children
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  constructor(private _exerciseService: ExerciseService, private _toastService: ToastService) { }

  ngAfterViewInit(): void {
    this.getExercises();
  }

  getExercises() {
    this.cardLoaderDirective.start();
    this._exerciseService
      .listExercises(this.pageInfo)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i && i.length > 0) {
            this.exercises = i;
          }
          else {
            this.exercises = new Array<ExerciseInfo>();
          }
          this.setPageInfo(this._exerciseService.getResponse());
        });
  }

  toggleExerciseStatus(id: number) {
    let toast = this._toastService.continuing("Egzersiz durumu güncelleniyor.", "Egzersiz durumu değiştirildi.", "Egzersiz güncellenemedi.");
    this.cardLoaderDirective.start();
    this._exerciseService
      .toggleExerciseStatus(id)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i) {
            let exercise = this.exercises.find(i => i.Exercise.Id == id);
            if (exercise) {
              exercise.Exercise.IsActive = !exercise.Exercise.IsActive;
              toast.success();
            }
            else {
              toast.error("Egzersiz bulunamadı");
            }
          }
        });
  }

  showAddExerciseModal(e?: ExerciseInfo) {
    if (e?.Document) {
      e.Exercise.File = { Url: e.Document.HostFullPath, IsChanged: false, Type: ConvertNumberToFileType(e.Document.Type) };
      this.forEditExercise = e;
      this.showStatusAddExerciseModal = true;
    }
    else {
      this.forEditExercise = e;
      this.showStatusAddExerciseModal = true;
    }
  }

  onExerciseUpdated(val: any) {
    if (val && val instanceof ExerciseInfo) {
      let exerciseIndex = this.exercises.findIndex(i => i.Exercise.Id == val.Exercise.Id)
      if (exerciseIndex >= 0) {
        this.exercises[exerciseIndex] = val;
      }
      else {
        this.exercises.unshift(val);
      }
    }
  }

  onPageInfoChanged(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getExercises();
  }

  setPageInfo(response: BaseResponse) {
    this.pageInfo.Page = response.Result.PageInfo.Page;
    this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
    this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
    this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
  }

  getDocumentType(value: number): FileType {
    return ConvertNumberToFileType(value);
  }
}