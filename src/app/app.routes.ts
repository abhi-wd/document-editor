import { Routes } from '@angular/router';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';
import { DefaultComponent } from './components/default/default.component';

export const routes: Routes = [
    { path: 'audio-recorder', component: AudioRecorderComponent },
    { path: 'document-editor', component: DefaultComponent },
];
