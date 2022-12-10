import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: Observable<Event[]> = this.eventService.getAll();

  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onDelete(eventId: number): void{
    this.eventService.remove(eventId).pipe(
      tap(() => {
        this.eventList$ = this.eventService.getAll();
      })
    ).subscribe();
  }
}
