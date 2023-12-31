import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';

@Component({
  selector: 'app-input-searcher',
  templateUrl: './input-searcher.component.html',
  styleUrls: ['./input-searcher.component.scss']
})
export class InputSearcherComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  @Input() disabled = false;
  @Input() placeholder = 'Escribe un producto...';

  @Input()  searchValue: string = '';
  listening: boolean = false;

  constructor() {
   // this.voiceRecognitionSvc.init()
  }

  ngOnInit(): void {

  }

  search() {
    this.searchEvent.emit(this.searchValue);
  }

 /*  voiceRecognition() {
    if (!this.listening) {
      this.searchValue = '';

      this.listening = true;
      this.voiceRecognitionSvc.start();
       this.voiceRecognitionSvc.getRealtimeText().subscribe((res: any) => {
        this.searchValue = res;
      })

      setTimeout(() => {
        this.listening = false;
        this.voiceRecognitionSvc.stop();
      }, 5000);
    } else {
      this.listening = false;
      this.voiceRecognitionSvc.stop();
    }

  }
 */
}
