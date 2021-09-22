import { Component } from "@angular/core";

@Component({
    templateUrl: './program-management.page.html',
    providers: []
})
export class ProgramManagementPage {
    public showStatusUpdateExerciseModal: boolean = false;

    showUpdateProgramModal(e?: any) {
        this.showStatusUpdateExerciseModal = true;
    }
}