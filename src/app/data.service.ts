import { Injectable } from "@angular/core";

import { episodes } from "../data/episodes";
import { Episode } from "./models";

const store = require("store");

@Injectable()
export class DataService {

    constructor() { }

    /**
     * Attempt to retrieve the episodes from localStorage. If they could not be retrieved, use the
     * data file.
     *
     * @return Episode[]
     */
    getEpisodes(): Episode[] {
        const storedData = store.get("episodes");

        if (storedData) {
            return storedData.map(ep => new Episode(ep.air_no, ep.episode_no, ep.title, ep.watched));
        }

        store.set("episodes", episodes);

        return episodes.map(ep => new Episode(ep.air_no, ep.episode_no, ep.title));
    }

    /**
     * Attempt to retrieve user settings from localStorage. If they could not be retrieved, setup
     * and return an empty object.
     *
     * @return Object
     */
    getSettings(): Object {
        const storedSettings = store.get("settings");

        if (storedSettings) {
            return storedSettings;
        }

        store.set("settings", {});

        return {};
    }

    /**
     * Save the episodes to localStorage.
     *
     * @param data Episode[]
     */
    saveEpisodes(data: Episode[]) {
        store.set("episodes", data);
    }

    /**
     * Save all settings to localStorage.
     *
     * @param settings Object
     */
    saveSettings(settings: Object) {
        store.set("settings", settings);
    }

    /**
     * Update a single setting, and save all settings to localStorage.
     *
     * @param key string
     * @param value any
     */
    saveSetting(key: string, value: any) {
        let settings = this.getSettings();

        settings[key] = value;

        store.set("settings", settings);
    }

}
