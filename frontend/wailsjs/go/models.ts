export namespace db {
	
	export class TimezoneEntry {
	    id: number;
	    timezone: string;
	
	    static createFrom(source: any = {}) {
	        return new TimezoneEntry(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.timezone = source["timezone"];
	    }
	}

}

