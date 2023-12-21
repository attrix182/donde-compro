import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

 recognition =  new webkitSpeechRecognition();

  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any;
  realTimeText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    console.log( window.navigator);
  }

  init() {

    this.recognition.interimResults = false;
    this.recognition.lang = 'es-AR';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
      this.realTimeText.next(transcript);
    });
  }

  getRealtimeText(){
    return this.realTimeText.asObservable();
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
    this.wordConcat()
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords ;
    this.tempWords = '';
  }
}
