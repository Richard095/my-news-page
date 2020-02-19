import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post, Category } from 'src/app/models/Post';
import { ActivatedRoute, Router } from '@angular/router';

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
  categorys: Category[] = [];
  formData: any = new FormData();
  imageContainer: any;
  isEdit: boolean = false;
  categorySelected: string;
  post: Post;

  editorStyle = {
    height: '350px'
  };

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['clean'],
      [{ 'direction': 'rtl' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
    ]
  }
  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.post = {
      title: '', category: '', subtitle: '', content: ''
    }
    this.categorys = [
      { value: 'Tech', viewValue: 'Tech' },
      { value: 'Innovations', viewValue: 'Innovations' },
      { value: 'Applications', viewValue: 'Applications' },
      { value: 'Android', viewValue: 'Android' },
      { value: 'Apple', viewValue: 'Apple' },
      { value: 'AI', viewValue: 'AI' }
    ]
    this.categorySelected = this.categorys[0].value; //For select value
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.postService.getPostById(params.id)
        .subscribe((res: Post) => {
          this.post = res;
          this.isEdit = true;
        }, (error) => console.log(error))
    }
  }

  onFileSelect(evt) {
    this.files = evt.target.files;
    if (this.files.length === 0) return;
    for (let i = 0; i < this.files.length; i++) {
      const mimeType: any = this.files[i].type;
      if (mimeType.match(/image\/*/)) this.imagesFiles.push(this.files[i]);
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
    this.post.category = this.categorySelected;
    this.formData.append("title", this.post.title);
    this.formData.append("subtitle", this.post.subtitle);
    this.formData.append("content", this.post.content);
    this.formData.append("category", this.post.category);
    for (let i = 0; i < this.imagesFiles.length; i++) {
      this.formData.append("image", this.imagesFiles[i]);
    }
    this.processing = true;
    this.postService.addPost(this.formData).subscribe((res: Post) => {
      this.processing = false;
      this.post = { title: '', subtitle: '', content: '', category: '' }
      this.formData.delete('title');
      this.formData.delete('subtitle');
      this.formData.delete('content');
      this.formData.delete('category');
      this.formData.delete('image');
      this.imagesFiles = [];
      while (this.imageContainer.hasChildNodes()) {
        this.imageContainer.removeChild(this.imageContainer.lastChild);
      }

    }, (error) => { this.processing = false; console.log(error); });

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

  removeDuplicateImages(imageArray, objectProperty) {
    const unique = imageArray
      .map(e => e[objectProperty])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => imageArray[e]).map(e => imageArray[e]);
    return unique;
  }

  updatePost() {
    delete this.post.createdAt;
    delete this.post.images;
    this.processing = true;
    this.postService.updatePost(this.post._id, this.post).subscribe((res: Post) => {
      this.processing = false;
      this.router.navigate(['admin/start'], { replaceUrl: true });
    }, (error) => {
      this.processing = false;
      //console.log(error)
    }
    )
  }

}
