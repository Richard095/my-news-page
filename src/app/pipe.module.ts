import { NgModule } from "@angular/core";
import { DateAgoPipe } from './shared/pipes/date-ago.pipe';

@NgModule({
  declarations: [DateAgoPipe],
  exports: [DateAgoPipe],
})
export class PipeAgoModule { }
