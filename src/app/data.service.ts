import { Injectable } from "@angular/core";

import { episodes } from "../data/episodes";
import { Episode } from "./models/Episode";

const store = require("store");

@Injectable()
export class DataService {

    constructor() { }

    getEpisodes(): Episode[] {
        const storedData = store.get("episodes");

        if (storedData) {
            return storedData.map(ep => new Episode(ep.air_no, ep.episode_no, ep.title, ep.watched));
        }

        store.set("episodes", episodes);

        return episodes.map(ep => new Episode(ep.air_no, ep.episode_no, ep.title));
    }

    saveEpisodes(data: Episode[]) {
        store.set("episodes", data);
    }

}
