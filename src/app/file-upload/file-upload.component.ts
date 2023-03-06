import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile!: File;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.add('drag-over');
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('drag-over');
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('drag-over');

    this.selectedFile = event.dataTransfer.files[0];
    this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:3000/sendfilebyc', formData).subscribe({
      next: () => {
        this.selectedFile = {} as File;
        this.showSnackBar('Archivo subido correctamente');
      },
      error: (error) => {
        this.showSnackBar('Error al subir el archivo');
        console.error(error);
      }
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000
    });
  }
}