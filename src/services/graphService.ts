require('isomorphic-fetch');
import { Client, Options } from '@microsoft/microsoft-graph-client';

import CONSTANTS from '../constants';

export default class MicrosoftGraphService {

    private async _getAuthenticatedClient(accessToken: string): Promise<Client> {
        const options: Options = {
            authProvider: (done) => done(null, accessToken)
        }
        return Client.init(options);
    }

    public async getUserDetails(accessToken: string) {
        const client = await this._getAuthenticatedClient(accessToken);
        return await client.api(CONSTANTS.MICROSOFT_GRAPH_CLIENT.API.ME.URL)
            .get();
    }

    public async getUserPhoto(accessToken: string): Promise<Blob> {
        const client = await this._getAuthenticatedClient(accessToken);
        return await client.api(CONSTANTS.MICROSOFT_GRAPH_CLIENT.API.ME_PHOTO_VALUE.URL)
            .get();
    }

}
