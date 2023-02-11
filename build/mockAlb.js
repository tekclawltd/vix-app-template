/* this is dev server mockAlb to avoid start listening port */
const express = require('express');
const colors = require('picocolors');

// copied from https://github.com/vendia/serverless-express/blob/mainline/jest-helpers/alb-event.js
/** Converts and express request to a lambda event */
const createAlbEvent = (expressReq) => {
    const { path, body, method, query, headers } = expressReq;
    // Copied from the API Gateway AWS Proxy event
    return {
        requestContext: {
            elb: {
                targetGroupArn: 'arn:aws:elasticloadbalancing:'
                + 'eu-west-1:347971939225:targetgroup/aws-s-Targe-RJF5FKWHX6Y8/29425aed99131fd0'
            }
        },
        httpMethod: method,
        path,
        multiValueQueryStringParameters: Object.keys(query)
        // each header needs to be wrapped in an array
            .reduce((multiValueQuery, queryName) => ({
                ...multiValueQuery,
                [queryName]: [query[queryName]]
            }), {}),
        multiValueHeaders: Object.keys(headers)
        // each header needs to be wrapped in an array
            .reduce((multiValueHeaders, headerName) => ({
                ...multiValueHeaders,
                [headerName]: [headers[headerName]]
            }), {}),
        body: JSON.stringify(body),
        isBase64Encoded: false
    };
};

/** Uses an express app to mock an ALB and call a lambda event handler */
const createMockAlb = (eventHandler, app = express()) => {
    // TODO: this should be replaced with something more official
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(async (req, res) => {
        const event = createAlbEvent(req);

        const context = {
            invokedFunctionArn: 'arn:aws:lambda:eu-west-1:589414389738:function:vicki-ui',
            functionVersion: 'LATEST'
        };
        try {
            const response = await eventHandler(event, context);
            res.status(response.statusCode);
            [response.headers, response.multiValueHeaders].filter(Boolean).forEach(resHeaders => {
                Object.entries(resHeaders).forEach(([headerKey, headerValue]) => {
                    const headerArr = Array.isArray(headerValue) ? headerValue : [headerValue];
                    // to set multiple cookies need to append 'set-cookie' value
                    headerArr.forEach(val => {
                        res.append(headerKey, val);
                    });
                });
            });
            res.send(response.body);
        } catch (er) {
            console.log('mockalb:er', er);
            res.status(500).send(er);
        }
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(colors.green(`\n[Mock ALB] listening on http://localhost:${PORT}\n`));
    });

    return app;
};

exports.default = createMockAlb;
