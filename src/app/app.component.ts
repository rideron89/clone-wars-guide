import { Component, OnInit } from "@angular/core";

import { Sort } from "@angular/material";

import { DataService } from "./data.service";
import { Episode } from "./models/Episode";

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {

    episodes: Episode[];

    sortedEpisodes: Episode[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.episodes = this.dataService.getEpisodes();

        this.sortedEpisodes = this.episodes.slice();
    }

    updateEpisode(episode: Episode) {
        this.dataService.saveEpisodes(this.sortedEpisodes);
    }

    sortData(sort: Sort) {
        const data = this.episodes.slice();

        if (!sort.active || sort.direction === "") {
            this.sortedEpisodes = data;

            return;
        }

        this.sortedEpisodes = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";

            switch (sort.active) {
                case "air_no": return compare(a.air_no, b.air_no, isAsc);
                case "episode_no": return compare(a.episode_no, b.episode_no, isAsc);
                case "title": return compare(a.title, b.title, isAsc);

                default: return 0;
            }
        });
    }

}
