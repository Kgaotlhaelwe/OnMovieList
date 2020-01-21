import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieProvider } from "../../providers/movie/movie"
import { AlertController } from 'ionic-angular';
import { ViewPage } from "../../pages/view/view"



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movieList = new Array();

  constructor(public navCtrl: NavController, public movie: MovieProvider, public alertCtrl: AlertController) {
    this.movie.getMovies().then((data: any) => {
      this.movieList = data;
    })

  }


  delete(id, index) {
    this.movie.deleteMovie(id).then((data) => {
      this.movieList.splice(index, 1)
      this.movie.presentToast("Deleted Successfully");
    })

  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'ADD MOVIE',
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',

          placeholder: 'Description'
        },

        {
          name: 'release_date',
          type: "date",
          placeholder: 'release_date'
        },

        {
          name: 'image',
          type: "file",

          placeholder: 'Cover image'
        },
      ],


      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let obj = {
              title: data.title,
              description: data.description,
              release_date: data.release_date,
              image: data.image
            }
            this.movie.addMovie(data.title, data.description, data.release_date, data.image).then((data) => {
              this.movieList.push(obj);
              this.movie.presentToast("Added successully");

            }).catch(error => {
              console.log(error)
            })
          }
        }
      ]
    });
    prompt.present();
  }



  update(id, title, description, release_date) {
    const prompt = this.alertCtrl.create({
      title: 'ADD MOVIE',
      message: "",
      inputs: [
        {
          name: 'title',
          value: title,
          placeholder: 'Title'
        },

        {
          name: 'description',
          value: description,
          placeholder: 'Description'
        },

        {
          name: 'release_date',
          type: "date",
          value: release_date,
          placeholder: 'release_date'
        },
      ],


      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            let obj = {
              title: data.title,
              description: data.description,
              release_date: data.release_date,
              image: data.image
            }
            this.movie.updateMovie(data.title, data.description, data.release_date, id).then(() => {
              this.movieList.splice(id, 0, obj)
              this.movie.presentToast("Updated successully");
            })
          }
        }
      ]
    });
    prompt.present();
  }


  View(image, title, description, release_date) {
    let movie = {
      image: image,
      title: title,
      description: description,
      release_date: release_date
    }
    this.navCtrl.push(ViewPage, { movie: movie })

  }



}
