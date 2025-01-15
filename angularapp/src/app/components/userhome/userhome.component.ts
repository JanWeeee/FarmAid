import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  newsArticles: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    // Commenting out the API call
    // this.newsService.getLatestNews().subscribe(data => {
    //   this.newsArticles = data.results;
    // });

    // Adding dummy data for now
    this.newsArticles = [
      {
        title: 'Dummy News 1',
        description: 'This is a brief description of dummy news item 1.',
        pubDate: '2024-11-30',
        image_url: 'assets/news.png'
      },
      {
        title: 'Dummy News 2',
        description: 'This is a brief description of dummy news item 2.',
        pubDate: '2024-11-29',
        image_url: 'assets/news.png'
      },
      {
        title: 'Dummy News 3',
        description: 'This is a brief description of dummy news item 3.',
        pubDate: '2024-11-28',
        image_url: 'assets/news.png'
      }
    ];
  }
}