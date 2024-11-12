import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private apiUrl = 'https://your-api-endpoint.com/upload'; // replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Method to upload the audio file
  uploadAudioFile(audioFile: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audioFile, 'audio.wav'); 

    const headers = new HttpHeaders({
      // Add any custom headers you need here
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
