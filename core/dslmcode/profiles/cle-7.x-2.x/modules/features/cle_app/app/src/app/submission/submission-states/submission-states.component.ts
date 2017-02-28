import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Submission } from '../submission';
import { SubmissionService } from '../submission.service';
import { updateSubmission } from '../submission.actions';
import { DialogComponent } from '../../dialog/dialog.component';
declare const Materialize:any;

@Component({
  selector: 'app-submission-states',
  templateUrl: './submission-states.component.html',
  styleUrls: ['./submission-states.component.scss']
})
export class SubmissionStatesComponent implements OnInit, OnChanges {
  @Input() submission:Submission;
  @ViewChild(DialogComponent) dialogComponent:DialogComponent;
  originalSubmission:Submission;
  selectedState:string;
  dialogContent:string = `
    Are you sure you want to change the state of this submission?
  `
  states:any[];

  constructor(
    private submissionService:SubmissionService,
    private router:Router,
    private store:Store<{}>
  ) { }

  ngOnInit() {
    this.originalSubmission = this.submission;
  }

  ngOnChanges() {
    // get the list of states this submission could be
    let options = this.submissionService.getSubmissionOptions();
    options.state
      .map(state => {
        // check if this state is the active state of the submission
        // add an active property to the active state
        state['active'] = state.value === this.submission.state;

        // add custom inline styles if the item is active
        let styles = {};
        if (state.active) {
          styles = {
            'color': state.color,
            'background': state.color
          }
        }
        state['styles'] = styles;

        return state;
      })
    this.states = options.state;

    // everytime the submission changes, look and see if the submission state
    // was updated
    if (typeof this.originalSubmission !== 'undefined') {
      if (this.originalSubmission.state !== this.submission.state) {
        Materialize.toast('Submission state updated', 1500);
      }
    }
    this.originalSubmission = this.submission;
  }

  onStateClick(item) {
    if (typeof this.submission.metadata.canUpdate !== 'undefined') {
      if (this.submission.metadata.canUpdate) {
        this.selectedState = item.value;
        this.dialogComponent.open();
      }
    }
  }

  onDialogAction($event) {
    if ($event === 'cancel') {
      this.dialogComponent.close();
    }
    if ($event === 'save') {
      let newSub = Object.assign({}, this.submission, {state: this.selectedState});
      this.dialogComponent.close();
      this.store.dispatch(updateSubmission(newSub));
    }
    // reset the selected state
    this.selectedState = '';
  }
}