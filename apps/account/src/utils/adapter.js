/*
 * Api.js
 * This module is responsible for handling all the implementations of our http Request. This module uses Axios to configure the data handling
 */

import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import * as Auth from './auth';
import nProgress from 'nprogress';

class ResourceFactory extends Object {
    // Factory class that generates resource classes. This is required to produce API endpoints. Each class will have the basic endpoints it needs

    static updateDefaults(config) {
        // update the defaults by taking whatever is there and adding the new stuff to it.
        ResourceFactory.defaults = { ...this.defaults, ...config };
    }

    static createResource(endpoint, config = {}) {
        // Generator function to create a resource class
        class Resource {
            // implement the http using axios
            static buildURL(pattern = '', data = {}) {
                // build the url out of the pattern and the data structure sent
                let stub = tmpl(pattern, data).replace(/\/+$/, '');
                return [this.endpoint, stub].join('/').replace(/\/+$/, '');
            }

            static executeRequest(
                data = {},
                pattern = '',
                method = 'GET',
                ctx = {}
            ) {
                // build and execute a request based on url pattern and method sent
                let url = this.buildURL(pattern, data);
                let config = { method, url };
                let key = method.toLowerCase() == 'get' ? 'params' : 'data';
                config[key] = data;
                return Auth.getAuthHeaders(ctx).then(headers => {
                    const updatedHeaders = Object.assign(
                        {},
                        headers,
                        this.config.headers
                    );
                    config['headers'] = updatedHeaders;
                    return this.axios.request(config);
                });
            }

            // Now implement all default methods
            static list(data = {}, ctx = {}) {
                return this.executeRequest(data, '', 'GET', ctx);
            }

            static get(data, ctx = {}) {
                return this.executeRequest(data, '{id}', 'GET', ctx);
            }

            static save(data, pattern = '{id}', ctx = {}) {
                // If there's an ID, switch from a create to an update method
                return this.executeRequest(data, pattern, 'POST', ctx);
            }

            static remove(data, pattern = '{id}', ctx = {}) {
                return this.executeRequest(data, pattern, 'DELETE', ctx);
            }

            static doAction(data, pattern = '{id}/{action}', ctx = {}) {
                return this.executeRequest(data, pattern, 'POST', ctx);
            }

            static listResource(data, pattern = '{id}/{path}', ctx = {}) {
                return this.executeRequest(data, pattern, 'GET', ctx);
            }
        }

        Resource.endpoint = endpoint;
        Resource.config = { ...ResourceFactory.defaults, ...config };
        Resource.axios = axios.create(Resource.config);

        // Integrating interceptors for request and response
        Resource.axios.interceptors.request.use(
            function (config) {
                nProgress.start();
                return config;
            },
            function (error) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        Resource.axios.interceptors.response.use(
            function (response) {
                nProgress.done();
                return response;
            },
            function (error) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        return Resource;
    }
}

ResourceFactory.defaults = {
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            arrayFormat: 'brackets',
            skipNulls: true,
            indices: false,
            encode: false,
        });
    },
};

export default ResourceFactory;