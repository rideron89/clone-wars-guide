import { Component, OnInit } from "@angular/core";

import { Sort } from "@angular/material";

import { DataService } from "./data.service";
import { Episode } from "./models";

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {

    private _hideWatched: boolean = false;
    private _seasonFilter: number;

    episodes: Episode[];

    get hideWatched(): boolean {
        return this._hideWatched;
    }

    set hideWatched(newValue: boolean) {
        this._hideWatched = newValue;

        this.dataService.saveSetting("hideWatched", newValue);

        this.sortData(<Sort>{});
    }

    get seasonFilter(): number {
        return this._seasonFilter;
    }

    set seasonFilter(newValue: number) {
        this._seasonFilter = newValue;

        this.sortData(<Sort>{});
    }

    sortedEpisodes: Episode[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        const settings = this.dataService.getSettings();

        if (settings["hideWatched"]) {
            this._hideWatched = settings["hideWatched"];
        }

        this.episodes = this.dataService.getEpisodes().slice();

        this.sortData(<Sort>{});
    }

    updateEpisode(episode: Episode) {
        this.dataService.saveEpisodes(this.sortedEpisodes);
    }

    updateSetting(key: string, value: string) {
        console.log(key, value);
    }

    sortData(sort: Sort) {
        const data = this.episodes.slice();

        // filter out watched episodes if the user wants them hidden
        const filteredData = data.filter(episode => {
            if (this.hideWatched && episode.watched) {
                return false;
            }

            if (this.seasonFilter > 0) {
                if (this.seasonFilter !== Math.floor(episode.episode_no / 100)) {
                    return false;
                }
            }

            return true;
        });

        if (!sort.active || sort.direction === "") {
            this.sortedEpisodes = filteredData;

            return;
        }

        this.sortedEpisodes = filteredData.sort((a, b) => {
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
