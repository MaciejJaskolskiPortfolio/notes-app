import { Component, OnInit } from '@angular/core';
import { CurrentDateService } from 'src/app/services/current-date/current-date.service';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-calendar-topbar',
  templateUrl: './calendar-topbar.component.html',
  styleUrls: ['./calendar-topbar.component.scss']
})
export class CalendarTopbarComponent implements OnInit {

  displayedDates = [];
  currentlySelectedDay = new Date().getDate();

  constructor(private currentDateService: CurrentDateService, private noteService: NotesService) { }

  ngOnInit() {
    this.displayedDates = this.currentDateService.getDatesToDisplay(this.currentDateService.getStartDate(new Date()));
  }

  compareDates(date: Date) {
    return this.noteService.compareDates(date, new Date(date.getFullYear(), date.getMonth(), this.currentlySelectedDay));
  }

  changeDate(nextDate: Date) {
    this.currentlySelectedDay = nextDate.getDate();
    this.currentDateService.changeDate(nextDate);
    this.displayedDates = this.currentDateService.getDatesToDisplay(this.currentDateService.getStartDate(nextDate));
  }

}
