import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.scss'
})
export class AudioRecorderComponent {
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  isRecording = false;
  audioUrl: string | null = null;

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.isRecording = true;
        this.mediaRecorder.start();

        this.mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.audioChunks = [];
          this.isRecording = false;
        });
      })
      .catch(error => console.error("Error accessing audio device:", error));
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  uploadAudio(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.audioUrl = URL.createObjectURL(file);
    }
  }
}
