import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})

export class CreatepostComponent implements OnInit {
  processing: boolean = false;
  date = new Date();
  files: any = [FileList];
  imagesFiles: any = [];
  post: Post;
  formData: any = new FormData();
  imageContainer: any;
  constructor(private postService: PostService) {
    this.post = { title: '', subtitle: '', content: '' }
  }

  ngOnInit() { }

  onFileSelect(evt) {
    this.files = evt.target.files;
    if (this.files.length === 0) return;
    for (let i = 0; i < this.files.length; i++) {
      const mimeType: any = this.files[i].type;
      if (mimeType.match(/image\/*/)) {
        this.imagesFiles.push(this.files[i]);
      }
    }
    this.imagesFiles = this.removeDuplicateImages(this.imagesFiles, 'name');
    this.imageContainer = document.getElementById("content-images");
    while (this.imageContainer.hasChildNodes()) {
      this.imageContainer.removeChild(this.imageContainer.lastChild);
    }
    this.imagesFiles.forEach(fileImage => {
      const fileImageName = fileImage.name;
      const reader = new FileReader();
      reader.readAsDataURL(fileImage);
      reader.onload = (_event) => {
        const urlimg: any = reader.result;
        this.previewImage(urlimg, fileImageName);
      }
    });
  }

  previewImage(urlImg, imageName) {
    let divImgContent = document.createElement('div');
    divImgContent.setAttribute('class', 'col-lg-3');
    let imgElement = document.createElement('img');
    imgElement.setAttribute("class", "img-fluid img-note");
    imgElement.setAttribute("id", imageName);
    imgElement.src = urlImg;
    imgElement.addEventListener('click', this.removeImageFromPreview.bind(this));
    divImgContent.appendChild(imgElement);
    this.imageContainer.appendChild(divImgContent);
  }

  addPost() {
    this.formData.append("title", this.post.title);
    this.formData.append("subtitle", this.post.subtitle);
    this.formData.append("content", this.post.content);
    for (let i = 0; i < this.imagesFiles.length; i++) {
      this.formData.append("image", this.imagesFiles[i]);
    }
    this.processing = true;
    this.postService.addPost(this.formData).subscribe((res: Post) => {
      this.processing = false;
      while (this.imageContainer.hasChildNodes()) {
        this.imageContainer.removeChild(this.imageContainer.lastChild);
      }
      this.imagesFiles = [];
      this.post = { title: '', subtitle: '', content: '' }

    }, (error) => {
      this.processing = false;
      console.log(error);
    });

  }

  removeImageFromPreview(event) {
    const imageId = event.target.id;
    for (let i = 0; i < this.imagesFiles.length; i++) {
      const imgName = this.imagesFiles[i].name;
      if (imgName === imageId) {
        this.imagesFiles.splice(i, 1);
        document.getElementById(imageId).parentElement.remove();
      }
    }
  }

  removeDuplicateImages(imageArray, comp) {
    const unique = imageArray
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => imageArray[e]).map(e => imageArray[e]);
    return unique;
  }

}
