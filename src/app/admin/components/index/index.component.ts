import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart } from 'chart.js';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { PostsResponse } from 'src/app/Interfaces/post';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  error: string | undefined
  authors: AuthorsResponse | undefined
  posts: PostsResponse | undefined
  topics: TopicsResponse | undefined
  chart: any = []
  chartPieInfo: any = []
  pielabelData: any = []
  pierealData: any = []
  LinechartInfo: any = []
  LinelabelData: any = []
  LInerealData: any = []




  constructor(private dialog: MatDialog, public auth: AuthService, private base: BaseService, private snackBar: MatSnackBar, private http: HttpClient, public chartservice: ChartService,
    private snack: MatSnackBar) {
    this.getPosts(this.base.base_uri_api + 'posts')
    this.get_authors(this.base.base_uri_api + 'authors')
    this.getTopics()
  }

  ngOnInit() {
    this.chartservice.getTopics().subscribe((res) => {
      this.LinechartInfo = res.body
      if (this.LinechartInfo != null) {

        for (let i = 0; i < this. LinechartInfo.data.length; i++) {
          this.LinelabelData.push(this. LinechartInfo.data[i].name)
          this.LInerealData.push(this. LinechartInfo.data[i].posts.length)

        }
        this.createPieChart(this.LinelabelData, this.LInerealData);
      }

    }),

    this.chartservice.getPosts().subscribe((res) => {
      this.chartPieInfo = res.body
      if (this.chartPieInfo != null) {

        for (let x = 0; x < this.chartPieInfo.data.length; x++) {
          this.pielabelData.push(this.chartPieInfo.data[x].title.slice(0, 4))
          this.pierealData.push(this.chartPieInfo.data[x].categories.length)

        }
        this.createLineChart(this.LinelabelData, this.LInerealData);
      }

    })
  }

  createPieChart(pielabelData: any, pierealData: any) {
    this.chart = new Chart('PieChart', {
      type: 'pie',
      data: {
        labels: pielabelData,
        datasets: [
          {
            label: 'No of Posts',
            data: pierealData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

  createLineChart(LinelabelData: any, LInerealData: any) {
    this.chart = new Chart('LineChart', {
      type: 'line',
      data: {
        labels: LinelabelData,
        datasets: [
          {
            label: 'No of Posts',
            data: LInerealData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }



  getTopics() {
    this.http.get(this.base.base_uri_api + 'categories', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.topics = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })

  }

  getPosts(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'categories, author, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.posts = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })

  }

  get_authors(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { withCredentials: true, observe: 'response', params: new HttpParams().append('with', 'posts,user, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.authors = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {

      }
    })
  }


}
