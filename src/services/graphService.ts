'use strict'

import { Client } from '@microsoft/microsoft-graph-client';
require('isomorphic-fetch');

import CONSTANTS from '../constants';

export default class MicrosoftGraphService {

    private async _getAuthenticatedClient(accessToken: string): Promise<Client> {
        return Client.init({ authProvider: (done) => done(null, accessToken) });
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
