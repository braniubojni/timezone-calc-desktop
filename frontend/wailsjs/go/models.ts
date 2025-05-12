export namespace db {
	
	export class TimezoneEntry {
	    id: number;
	    timezone: string;
	    added_at: string;
	
	    static createFrom(source: any = {}) {
	        return new TimezoneEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.timezone = source["timezone"];
	        this.added_at = source["added_at"];
	    }
	}

}

