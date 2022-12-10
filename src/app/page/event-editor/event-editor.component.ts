import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  @ViewChild('eventForm') eventForm: NgForm | undefined;

  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => Number(params['id']) ? this.eventService.get(params['id']) : of(new Event()))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(event: Event) {
    if (!event.id) {
      const modifiedEvent: Event = {
        name: event.name,
        date: event.date,
        time: event.time,
        location: event.location,
      }
      this.eventService.create(modifiedEvent).pipe(
        tap(() => {
          this.router.navigate(['']);
        }),
      ).subscribe();
    } else {
      this.eventService.update(event).pipe(
        tap(() => {
          this.router.navigate(['']);
        }),
      ).subscribe();
    }
  }
}
