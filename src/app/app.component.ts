import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'file-upload-demo';

  basePath: string = '/images';
  downloadedFileUrl: string = '';
  task: AngularFireUploadTask;
  progressValue: Observable<number>;

  constructor(private fireStorage: AngularFireStorage) {}

  ngOnInit() {}

  async onFileChanged(event: any) {
    console.log(event);
    const file = event.target.files[0];
    console.log('file found');

    if (file) {
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.fireStorage.upload(filePath, file);
      this.progressValue = this.task.percentageChanges();

      console.log(filePath);

      (await this.task).ref.getDownloadURL().then((url) => {
        this.downloadedFileUrl = url;
        console.log(this.downloadedFileUrl);
      });
    } else {
      alert('No images selected');
      this.downloadedFileUrl = '';
    }
  }
}
