import serverless from '@vendia/serverless-express';
import setupExpressApp from './expressApp';

type Event = AWSLambda.APIGatewayProxyEvent | AWSLambda.APIGatewayProxyEventV2;

let cachedHandler: any = null;
/** Event handler wrapper for an AWS lambda */
export const eventHandler = async (event: Event, context: AWSLambda.Context, callback: AWSLambda.ALBCallback) => {
    // The lambda may receive events while the app initializes; wait for the app to be ready.
    // Once initialised the promise is resolved, to handler is available immediately
    if (!cachedHandler) {
        // This setup step is asyncronous, but the lambda may receive
        const expressApp = await setupExpressApp();
        cachedHandler = serverless({ app: expressApp });
    }
    return cachedHandler(event, context, callback);
};

export default eventHandler;
