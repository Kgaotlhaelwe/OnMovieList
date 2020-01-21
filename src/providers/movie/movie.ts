import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

 

  constructor(public http: HttpClient , public loadingCtrl: LoadingController , public toastCtrl: ToastController) {
    console.log('Hello MovieProvider Provider');
  }


  getMovies() {
    var url = "http://localhost:3000/movies/movieslist" ;
    
    return new Promise ((resolve, reject) => {
     
      this.http.get(url).subscribe(data =>{
         resolve(data);
      })
    });

  }

  deleteMovie(id){
    var url = `http://localhost:3000/movie/${id}` ;
    return new Promise ((resolve, reject) => {
      this.http.delete(url,{responseType: 'text'}).subscribe(data =>{
         resolve(data);
      })
    });
  }


  addMovie(title , description ,release_date , image){
    var url = `http://localhost:3000/movie/add` ;
    
    return new Promise ((resolve, reject) => {
      this.http.post(url , {
        "title":title ,
        "description":description ,
        "release_date":release_date ,
        "image":image
      } ,
      {responseType: 'text'}
      
      
      ).subscribe(data =>{
         resolve(data);
      })
    });
  }

  updateMovie(title , description ,release_date , id ){
    var url = `http://localhost:3000/movie/${id}` ;
    return new Promise ((resolve, reject) => {
      this.http.put(url , {
        "title":title ,
        "description":description ,
        "release_date":release_date ,
       
      } , 
      {responseType: 'text'}
      )
      .subscribe(data =>{
         resolve(data);
      })
    });
  }


  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
