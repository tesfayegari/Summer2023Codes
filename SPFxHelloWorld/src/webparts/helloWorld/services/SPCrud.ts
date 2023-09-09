import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

export default class SPCrud {

    constructor(private context: WebPartContext) { }


    readItems(listName: string, oData: string) {
        let url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items${oData}`;

        return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then(response => response.json())
    }

}