
export class Episode {
    air_no: number;

    episode_no: number;

    title: string;

    watched: boolean;

    constructor(air_no: string, episode_no: string, title: string, watched?: boolean) {
        this.air_no = parseInt(air_no, 10);
        this.episode_no = parseInt(episode_no, 10);
        this.title = title;
        this.watched = !!watched;
    }
}
